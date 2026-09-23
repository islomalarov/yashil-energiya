// Hygraph RichText AST (`field { raw }`) -> Portable Text.
//
// Hygraph RichText is a Slate-like JSON tree, not HTML or Markdown, so it is
// mapped structurally. Node types handled are the ones found in the content
// inventory (see inventory.mjs); anything else is salvaged as text and
// reported, never silently dropped.
//
// Keys are derived from a seed + counter, so reruns over the same snapshot
// produce identical `_key` values (idempotent imports, stable diffs).
import { createHash } from "node:crypto";
import { originalAssetUrl, sanityAssetDirective } from "./assets.mjs";

// Hygraph leaf flag -> Portable Text decorator.
export const DECORATORS = {
  bold: "strong",
  italic: "em",
  underline: "underline",
  superscript: "sup",
  subscript: "sub",
  code: "code",
};

export const BLOCK_STYLES = ["normal", "h2", "h3", "h4", "h5", "blockquote"];
export const LIST_TYPES = { "bulleted-list": "bullet", "numbered-list": "number" };
export const CUSTOM_BLOCK_TYPES = ["imageBlock", "table"];

// The page title is the only <h1>; the current renderer already outputs a
// CMS `heading-three` as <h2>. Keep that shift for every level so hierarchy is
// preserved: heading-N -> h(N-1), never above h2.
const HEADING_LEVELS = {
  "heading-one": 1,
  "heading-two": 2,
  "heading-three": 3,
  "heading-four": 4,
  "heading-five": 5,
  "heading-six": 6,
};

export function headingStyle(type) {
  return `h${Math.max(2, HEADING_LEVELS[type] - 1)}`;
}

export function createKeyFactory(seed) {
  let counter = 0;
  return () =>
    createHash("sha1").update(`${seed}:${counter++}`).digest("hex").slice(0, 12);
}

// Default image mapping: NDJSON `_sanityAsset` directive to the original file.
export function defaultImageResolver(node) {
  return {
    _sanityAsset: sanityAssetDirective("image", originalAssetUrl(node.src, node.handle)),
  };
}

const isRecord = (value) => typeof value === "object" && value !== null;

const children = (node) =>
  isRecord(node) && Array.isArray(node.children) ? node.children : [];

const isLeaf = (node) => isRecord(node) && typeof node.text === "string";

const hasOnlyLeavesOrLinks = (nodes) =>
  nodes.every((n) => isLeaf(n) || n.type === "link");

// Links saved without a protocol ("president.uz/...") render as relative URLs
// and 404. Prefix https:// and report it so the fix is visible in QA.
function normalizeHref(rawHref, ctx) {
  const href = String(rawHref ?? "").trim();
  if (!href) {
    ctx.issue("link-empty-href");
    return href;
  }
  if (/^(https?:|mailto:|tel:|\/|#)/i.test(href)) return href;
  if (/^[\w-]+(\.[\w-]+)+(\/|$)/.test(href)) {
    ctx.issue("link-missing-protocol-fixed", { href });
    return `https://${href}`;
  }
  ctx.issue("link-unrecognized-href", { href });
  return href;
}

function convertInline(nodes, ctx, marks, markDefs) {
  const spans = [];

  for (const node of nodes) {
    if (isLeaf(node)) {
      const decorators = [];
      for (const [flag, value] of Object.entries(node)) {
        if (flag === "text" || value !== true) continue;
        if (DECORATORS[flag]) decorators.push(DECORATORS[flag]);
        else ctx.issue("unsupported-mark-dropped", { mark: flag });
      }
      spans.push({
        _type: "span",
        _key: ctx.key(),
        text: node.text.replace(/\r\n?/g, "\n"),
        marks: [...marks, ...decorators],
      });
      continue;
    }

    if (node?.type === "link") {
      const markKey = ctx.key();
      const markDef = { _type: "link", _key: markKey, href: normalizeHref(node.href, ctx) };
      if (typeof node.openInNewTab === "boolean") markDef.openInNewTab = node.openInNewTab;
      markDefs.push(markDef);
      spans.push(...convertInline(children(node), ctx, [...marks, markKey], markDefs));
      continue;
    }

    // Transparent inline containers (e.g. list-item-child) — unwrap.
    if (children(node).length) {
      if (node.type !== "list-item-child") {
        ctx.issue("unexpected-inline-container", { nodeType: node.type });
      }
      spans.push(...convertInline(children(node), ctx, marks, markDefs));
      continue;
    }

    ctx.issue("unsupported-inline-dropped", { nodeType: node?.type });
  }

  return spans;
}

const blockHasText = (block) =>
  block.children.some((span) => span.text.trim() !== "");

function textBlock(inlineNodes, ctx, props = {}) {
  const markDefs = [];
  const spans = convertInline(inlineNodes, ctx, [], markDefs);
  return {
    _type: "block",
    _key: ctx.key(),
    style: "normal",
    ...props,
    markDefs,
    children: spans.length
      ? spans
      : [{ _type: "span", _key: ctx.key(), text: "", marks: [] }],
  };
}

// The current renderer hides empty paragraphs/list items; drop them here so
// editors don't inherit invisible blocks. Counted for the report.
function pushIfText(out, block, ctx) {
  if (blockHasText(block)) out.push(block);
  else ctx.stat("droppedEmptyBlocks");
}

// A list-item-child may wrap its text in paragraph(s). Unwrap them; with
// several paragraphs keep a line break between them so words never run
// together (the whitespace-insensitive fidelity check could not catch that).
function listItemInline(child, ctx) {
  const nodes = children(child);
  const paragraphs = nodes.filter((n) => n.type === "paragraph").length;
  if (!paragraphs) return nodes;
  if (paragraphs > 1) ctx.issue("list-item-multi-paragraph");

  const inline = [];
  for (const node of nodes) {
    if (node.type !== "paragraph") {
      inline.push(node);
      continue;
    }
    if (inline.length) inline.push({ text: "\n" });
    inline.push(...children(node));
  }
  return inline;
}

function convertList(node, ctx, level, out) {
  const listItem = LIST_TYPES[node.type];

  for (const item of children(node)) {
    const inline = [];
    const nested = [];
    for (const child of children(item)) {
      if (LIST_TYPES[child.type]) nested.push(child);
      else if (child.type === "list-item-child") inline.push(...listItemInline(child, ctx));
      else inline.push(child);
    }
    pushIfText(out, textBlock(inline, ctx, { listItem, level }), ctx);
    nested.forEach((list) => convertList(list, ctx, level + 1, out));
  }
}

function convertCellContent(cell, ctx) {
  const nodes = children(cell);
  const paragraphs = nodes.filter((n) => n.type === "paragraph");
  // Some cells hold leaves directly, without a paragraph wrapper.
  const sources = paragraphs.length ? paragraphs.map(children) : [nodes];

  const blocks = [];
  sources.forEach((inline) => pushIfText(blocks, textBlock(inline, ctx), ctx));
  return blocks;
}

function cellIsBold(cell) {
  let sawText = false;
  let allBold = true;
  const visit = (nodes) => {
    for (const n of nodes) {
      if (isLeaf(n) && n.text.trim() !== "") {
        sawText = true;
        if (n.bold !== true) allBold = false;
      }
      visit(children(n));
    }
  };
  visit(children(cell));
  return sawText && allBold;
}

const CELL_TYPES = new Set(["table_cell", "table_header_cell"]);

function leafText(node) {
  if (isLeaf(node)) return node.text;
  return children(node).map(leafText).join("");
}

const hygraphRowText = (cells) => cells.map(leafText).join(" | ");

function convertTable(node, ctx) {
  const rows = [];
  const collect = (row, isHeader) => {
    const cells = children(row).filter((c) => CELL_TYPES.has(c.type));
    rows.push({
      source: cells,
      isHeader:
        isHeader ||
        (cells.length > 0 && cells.every((c) => c.type === "table_header_cell")),
    });
  };

  for (const child of children(node)) {
    if (child.type === "table_head") children(child).forEach((r) => collect(r, true));
    else if (child.type === "table_body") children(child).forEach((r) => collect(r, false));
    else if (child.type === "table_row") collect(child, false);
    else ctx.issue("unsupported-table-child", { nodeType: child.type });
  }

  // Same rule as TheTable: with no explicit head, a leading all-bold row is
  // the header. Baked into data so editors get an explicit, editable flag —
  // and reported, because a bold first data row can be misread as a header.
  if (rows.length && !rows.some((r) => r.isHeader) && rows[0].source.every(cellIsBold)) {
    rows[0].isHeader = true;
    ctx.issue("table-header-inferred", { firstRow: hygraphRowText(rows[0].source) });
  }

  return {
    _type: "table",
    _key: ctx.key(),
    rows: rows.map((row) => ({
      _type: "tableRow",
      _key: ctx.key(),
      isHeader: row.isHeader,
      cells: row.source.map((cell) => ({
        _type: "tableCell",
        _key: ctx.key(),
        content: convertCellContent(cell, ctx),
      })),
    })),
  };
}

function convertImage(node, ctx) {
  const block = { _type: "imageBlock", _key: ctx.key(), ...ctx.resolveImage(node) };
  const alt = typeof node.altText === "string" ? node.altText.trim() : "";
  if (alt) block.alt = alt;
  else ctx.issue("image-missing-alt", { src: node.src });
  return block;
}

function convertBlock(node, ctx, out) {
  const type = node?.type;

  if (type === "paragraph") return pushIfText(out, textBlock(children(node), ctx), ctx);

  if (HEADING_LEVELS[type]) {
    return pushIfText(out, textBlock(children(node), ctx, { style: headingStyle(type) }), ctx);
  }

  if (type === "block-quote" || type === "blockquote" || type === "block_quote") {
    const nodes = children(node);
    const groups = hasOnlyLeavesOrLinks(nodes) ? [nodes] : nodes.map(children);
    groups.forEach((inline) =>
      pushIfText(out, textBlock(inline, ctx, { style: "blockquote" }), ctx),
    );
    return;
  }

  if (LIST_TYPES[type]) return convertList(node, ctx, 1, out);
  if (type === "image") return out.push(convertImage(node, ctx));
  if (type === "table") return out.push(convertTable(node, ctx));

  // Unknown node: keep its text rather than lose content, and report it.
  const salvaged = textBlock(children(node), ctx);
  if (blockHasText(salvaged)) {
    ctx.issue("unsupported-node-salvaged", { nodeType: type });
    out.push(salvaged);
  } else {
    ctx.issue("unsupported-node-dropped", { nodeType: type });
  }
}

/**
 * @param {unknown} raw Hygraph `raw` value: `{ children: [...] }` or an array.
 * @param {{ seed: string, resolveImage?: (node: object) => object }} options
 * @returns {{ blocks: object[], issues: object[], stats: Record<string, number> }}
 */
export function richTextToPortableText(raw, { seed, resolveImage = defaultImageResolver }) {
  const issues = [];
  const stats = {};
  const ctx = {
    key: createKeyFactory(seed),
    resolveImage,
    issue: (type, details = {}) => issues.push({ ...details, type }),
    stat: (name) => {
      stats[name] = (stats[name] ?? 0) + 1;
    },
  };

  const nodes = Array.isArray(raw) ? raw : children(raw);
  const blocks = [];
  nodes.forEach((node) => convertBlock(node, ctx, blocks));

  return { blocks, issues, stats };
}
