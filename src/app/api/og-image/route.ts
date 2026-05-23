import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

const allowedImageHosts = new Set(["us-west-2.graphassets.com"]);

export const runtime = "nodejs";

function escapeSvgText(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function wrapText(text: string, maxLineLength: number, maxLines: number) {
  const words = text.replace(/\s+/g, " ").trim().split(" ");
  const lines: string[] = [];

  for (const word of words) {
    const currentLine = lines[lines.length - 1];

    if (!currentLine) {
      lines.push(word);
      continue;
    }

    if (`${currentLine} ${word}`.length <= maxLineLength) {
      lines[lines.length - 1] = `${currentLine} ${word}`;
      continue;
    }

    if (lines.length === maxLines) {
      lines[lines.length - 1] = `${currentLine.replace(/\.+$/, "")}...`;
      break;
    }

    lines.push(word);
  }

  return lines.slice(0, maxLines);
}

function createOverlay(title: string, cta: string) {
  const titleLines = wrapText(title, 33, 3);
  const titleText = titleLines
    .map(
      (line, index) =>
        `<tspan x="74" dy="${index === 0 ? 0 : 54}">${escapeSvgText(line)}</tspan>`,
    )
    .join("");

  return Buffer.from(`
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#07150d" stop-opacity="0.82"/>
          <stop offset="0.58" stop-color="#07150d" stop-opacity="0.28"/>
          <stop offset="1" stop-color="#07150d" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#shade)"/>
      <rect x="74" y="74" width="78" height="6" rx="3" fill="#159447"/>
      <text x="74" y="126" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700" letter-spacing="0">Yashil Energiya</text>
      <text x="74" y="276" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="44" font-weight="700" letter-spacing="0">${titleText}</text>
      <rect x="74" y="500" width="178" height="54" rx="8" fill="#159447"/>
      <text x="163" y="535" text-anchor="middle" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="700" letter-spacing="0">${escapeSvgText(cta)}</text>
    </svg>
  `);
}

export async function GET(request: NextRequest) {
  const source = request.nextUrl.searchParams.get("src");
  const title = request.nextUrl.searchParams.get("title");
  const cta = request.nextUrl.searchParams.get("cta") || "Read article";

  if (!source) {
    return new NextResponse("Missing image source", { status: 400 });
  }

  let sourceUrl: URL;

  try {
    sourceUrl = new URL(source);
  } catch {
    return new NextResponse("Invalid image source", { status: 400 });
  }

  if (
    sourceUrl.protocol !== "https:" ||
    !allowedImageHosts.has(sourceUrl.hostname)
  ) {
    return new NextResponse("Unsupported image source", { status: 400 });
  }

  const imageResponse = await fetch(sourceUrl, {
    next: { revalidate: 60 * 60 * 24 * 30 },
  });

  if (!imageResponse.ok) {
    return new NextResponse("Image source unavailable", { status: 502 });
  }

  const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());
  const image = sharp(imageBuffer)
    .resize(1200, 630, {
      fit: "cover",
      position: "center",
    });

  if (title) {
    image.composite([
      {
        input: createOverlay(title, cta),
        top: 0,
        left: 0,
      },
    ]);
  }

  const optimizedImage = await image
    .jpeg({
      quality: 78,
      mozjpeg: true,
    })
    .toBuffer();

  return new NextResponse(new Uint8Array(optimizedImage), {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
