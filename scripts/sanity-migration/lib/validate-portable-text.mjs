// Structural validation of converted Portable Text, plus a text-fidelity
// check against the Hygraph source. Sanity schema validation only runs in
// Studio, not on API/CLI writes — so everything is checked before import.
import {
  BLOCK_STYLES,
  CUSTOM_BLOCK_TYPES,
  DECORATORS,
} from "./richtext-to-portable-text.mjs";

const DECORATOR_NAMES = new Set(Object.values(DECORATORS));
const LIST_ITEMS = new Set(["bullet", "number"]);

function checkKeys(items, path, errors) {
  const seen = new Set();
  items.forEach((item, i) => {
    if (typeof item?._key !== "string" || !item._key) {
      errors.push(`${path}[${i}]: missing _key`);
    } else if (seen.has(item._key)) {
      errors.push(`${path}[${i}]: duplicate _key ${item._key}`);
    } else {
      seen.add(item._key);
    }
  });
}

function validateTextBlock(block, path, errors) {
  if (!BLOCK_STYLES.includes(block.style)) {
    errors.push(`${path}: unknown style ${block.style}`);
  }
  if (block.listItem !== undefined) {
    if (!LIST_ITEMS.has(block.listItem)) errors.push(`${path}: unknown listItem ${block.listItem}`);
    if (!Number.isInteger(block.level) || block.level < 1) errors.push(`${path}: bad level`);
  }
  if (!Array.isArray(block.markDefs)) errors.push(`${path}: markDefs must be an array`);
  if (!Array.isArray(block.children) || !block.children.length) {
    errors.push(`${path}: children must be a non-empty array`);
    return;
  }

  const markDefs = block.markDefs ?? [];
  checkKeys(markDefs, `${path}.markDefs`, errors);
  const defKeys = new Set(markDefs.map((d) => d._key));
  markDefs.forEach((def, i) => {
    if (def._type !== "link") errors.push(`${path}.markDefs[${i}]: unknown type ${def._type}`);
    if (typeof def.href !== "string") errors.push(`${path}.markDefs[${i}]: missing href`);
  });

  checkKeys(block.children, `${path}.children`, errors);
  block.children.forEach((span, i) => {
    const spanPath = `${path}.children[${i}]`;
    if (span._type !== "span") errors.push(`${spanPath}: expected span`);
    if (typeof span.text !== "string") errors.push(`${spanPath}: text must be a string`);
    if (!Array.isArray(span.marks)) {
      errors.push(`${spanPath}: marks must be an array`);
      return;
    }
    span.marks.forEach((mark) => {
      if (!DECORATOR_NAMES.has(mark) && !defKeys.has(mark)) {
        errors.push(`${spanPath}: mark ${mark} has no decorator or markDef`);
      }
    });
  });
}

function validateTable(table, path, errors) {
  if (!Array.isArray(table.rows) || !table.rows.length) {
    errors.push(`${path}: table has no rows`);
    return;
  }
  checkKeys(table.rows, `${path}.rows`, errors);
  table.rows.forEach((row, r) => {
    const rowPath = `${path}.rows[${r}]`;
    if (row._type !== "tableRow") errors.push(`${rowPath}: expected tableRow`);
    if (typeof row.isHeader !== "boolean") errors.push(`${rowPath}: isHeader must be boolean`);
    checkKeys(row.cells ?? [], `${rowPath}.cells`, errors);
    (row.cells ?? []).forEach((cell, c) => {
      const cellPath = `${rowPath}.cells[${c}]`;
      if (cell._type !== "tableCell") errors.push(`${cellPath}: expected tableCell`);
      // Cell bodies are Portable Text too, restricted to text blocks.
      validatePortableText(cell.content ?? [], `${cellPath}.content`, errors, {
        allowCustom: false,
      });
    });
  });
}

/**
 * Returns a list of human-readable errors; empty means valid.
 */
export function validatePortableText(
  blocks,
  path = "body",
  errors = [],
  { allowCustom = true } = {},
) {
  if (!Array.isArray(blocks)) {
    errors.push(`${path}: must be an array`);
    return errors;
  }
  checkKeys(blocks, path, errors);

  blocks.forEach((block, i) => {
    const blockPath = `${path}[${i}]`;
    if (block?._type === "block") return validateTextBlock(block, blockPath, errors);

    if (!allowCustom || !CUSTOM_BLOCK_TYPES.includes(block?._type)) {
      errors.push(`${blockPath}: unexpected block type ${block?._type}`);
      return;
    }
    if (block._type === "table") return validateTable(block, blockPath, errors);
    if (block._type === "imageBlock" && !block._sanityAsset && !block.asset) {
      errors.push(`${blockPath}: imageBlock without asset`);
    }
  });

  return errors;
}

// Every text leaf of the Hygraph tree, concatenated.
export function hygraphText(node) {
  if (!node || typeof node !== "object") return "";
  if (Array.isArray(node)) return node.map(hygraphText).join("");
  const own = typeof node.text === "string" ? node.text : "";
  return own + hygraphText(node.children);
}

// Every span of the Portable Text, including table cells, concatenated.
export function portableText(blocks) {
  return blocks
    .map((block) => {
      if (block._type === "block") return block.children.map((s) => s.text).join("");
      if (block._type === "table") {
        return block.rows
          .flatMap((row) => row.cells.map((cell) => portableText(cell.content)))
          .join("");
      }
      return "";
    })
    .join("");
}

const squash = (text) => text.replace(/\s+/g, "");

// True when no visible character was lost or altered by the conversion.
export function textPreserved(raw, blocks) {
  return squash(hygraphText(raw)) === squash(portableText(blocks));
}
