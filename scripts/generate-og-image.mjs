import { Buffer } from "node:buffer";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = path.join(root, "public", "og-image.jpg");
const logoPath = path.join(root, "public", "logo_2.png");

const width = 1200;
const height = 630;

const ogSvg = Buffer.from(`
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#e9fff5"/>
      <stop offset="0.5" stop-color="#c6f4df"/>
      <stop offset="1" stop-color="#12903e"/>
    </linearGradient>
    <linearGradient id="panel" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#08351c"/>
      <stop offset="1" stop-color="#12903e"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="18" flood-color="#00180a" flood-opacity="0.22"/>
    </filter>
  </defs>

  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <g opacity="0.24" stroke="#ffffff" stroke-width="3">
    <path d="M690 150 L1180 56 L1170 190 L650 292 Z"/>
    <path d="M700 305 L1165 210 L1145 370 L660 476 Z"/>
    <path d="M760 72 L748 500"/>
    <path d="M870 52 L850 476"/>
    <path d="M982 40 L948 448"/>
    <path d="M1088 36 L1040 418"/>
    <path d="M678 224 L1168 128"/>
    <path d="M670 380 L1152 278"/>
  </g>
  <circle cx="1036" cy="118" r="92" fill="#ffffff" opacity="0.22"/>
  <circle cx="1036" cy="118" r="54" fill="#ffffff" opacity="0.24"/>
  <path d="M760 630 C940 520 1064 540 1200 428 L1200 630 Z" fill="url(#panel)" opacity="0.72"/>
  <rect x="62" y="70" width="610" height="490" rx="28" fill="#ffffff" filter="url(#shadow)"/>
  <rect x="62" y="70" width="10" height="490" rx="5" fill="#12903e"/>

  <text x="108" y="268" font-family="Arial, Helvetica, sans-serif" font-size="54" line-height="1.1" font-weight="800" fill="#13251a">
    <tspan x="108" dy="0">Yashil Energiya</tspan>
    <tspan x="108" dy="64">Renewable Energy</tspan>
    <tspan x="108" dy="64">in Uzbekistan</tspan>
  </text>

  <text x="108" y="470" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="500" fill="#425247">
    Solar, micro hydro and EV charging infrastructure
  </text>

  <rect x="108" y="504" width="154" height="46" rx="23" fill="#12903e"/>
  <text x="185" y="534" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="700" fill="#ffffff">
    Read more
  </text>

</svg>
`);

const logo = await sharp(logoPath)
  .resize({ width: 250, withoutEnlargement: true })
  .png()
  .toBuffer();

await sharp({
  create: {
    width,
    height,
    channels: 3,
    background: "#e9fff5",
  },
})
  .composite([
    { input: ogSvg, top: 0, left: 0 },
    { input: logo, top: 112, left: 108 },
  ])
  .jpeg({ quality: 82, progressive: true, mozjpeg: true })
  .toFile(outputPath);

const metadata = await sharp(outputPath).metadata();
process.stdout.write(
  `Generated ${path.relative(root, outputPath)} ${metadata.width}x${metadata.height}\n`,
);
