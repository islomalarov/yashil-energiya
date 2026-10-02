// Portable Text block <-> tagged text, for translating rich text.
//
// A translator gets one string per block, where formatting and links are
// tags around the words they cover:
//   "<b>10 GW</b> is the installed capacity<sup>1</sup>, see <a1>the report</a1>."
// Translating the string (moving the tags with the words) and parsing it back
// yields a block in another language with the same formatting and links.
//
// Tags: <b> strong, <i> em, <u> underline, <sup> sup, <a1>…<aN> the block's
// link annotations in order of first appearance.

const DECORATOR_TAGS = { strong: "b", em: "i", underline: "u", sup: "sup" };
const TAG_DECORATORS = Object.fromEntries(
  Object.entries(DECORATOR_TAGS).map(([mark, tag]) => [tag, mark]),
);
// Outer to inner, so nesting is always produced in the same order.
const DECORATOR_ORDER = ["strong", "em", "underline", "sup"];

/**
 * @returns {{ text: string, links: object[] }} `links[n]` is the markDef of `<a{n+1}>`.
 */
export function blockToMarkup(block) {
  const defs = new Map((block.markDefs ?? []).map((def) => [def._key, def]));
  const linkIndex = new Map();
  const links = [];

  const parts = block.children.map((span) => {
    const marks = span.marks ?? [];
    const open = [];
    for (const mark of marks) {
      if (!defs.has(mark)) continue;
      if (!linkIndex.has(mark)) {
        links.push(defs.get(mark));
        linkIndex.set(mark, links.length);
      }
      open.push(`a${linkIndex.get(mark)}`);
    }
    for (const mark of DECORATOR_ORDER) {
      if (marks.includes(mark)) open.push(DECORATOR_TAGS[mark]);
    }
    const close = [...open].reverse();
    return `${open.map((t) => `<${t}>`).join("")}${span.text}${close.map((t) => `</${t}>`).join("")}`;
  });

  return { text: parts.join(""), links };
}

const TAG_RE = /<(\/?)(b|i|u|sup|a\d+)>/g;

/**
 * Parse tagged text back into Portable Text spans + markDefs.
 * Throws on unbalanced tags or unknown link numbers.
 * @param {string} text
 * @param {object[]} links markDefs from blockToMarkup, by tag number
 * @param {() => string} key generator for new _key values
 */
export function markupToChildren(text, links, key) {
  const stack = [];
  const spans = [];
  const linkKeys = new Map();
  const usedLinks = new Set();
  let last = 0;

  const pushText = (value) => {
    if (!value) return;
    const marks = stack.map((tag) => {
      if (tag.startsWith("a")) {
        const n = Number(tag.slice(1));
        if (!linkKeys.has(n)) linkKeys.set(n, key());
        usedLinks.add(n);
        return linkKeys.get(n);
      }
      return TAG_DECORATORS[tag];
    });
    // Same marks as the previous span → merge (translators move tags around).
    const prev = spans.at(-1);
    if (prev && prev.marks.join("|") === marks.join("|")) prev.text += value;
    else spans.push({ _type: "span", _key: key(), text: value, marks });
  };

  for (const match of text.matchAll(TAG_RE)) {
    pushText(text.slice(last, match.index));
    last = match.index + match[0].length;
    const [, closing, tag] = match;
    if (tag.startsWith("a") && !links[Number(tag.slice(1)) - 1]) {
      throw new Error(`unknown link tag <${tag}>`);
    }
    if (!closing) {
      stack.push(tag);
    } else {
      const index = stack.lastIndexOf(tag);
      if (index === -1) throw new Error(`closing </${tag}> without opening`);
      stack.splice(index, 1);
    }
  }
  pushText(text.slice(last));
  if (stack.length) throw new Error(`unclosed tags: ${stack.join(", ")}`);
  if (/<\/?[a-z]+\d*>/i.test(text.replace(TAG_RE, ""))) {
    throw new Error("unknown tag in text");
  }

  const markDefs = [...linkKeys].map(([n, newKey]) => ({
    ...links[n - 1],
    _key: newKey,
  }));
  const missingLinks = links
    .map((_, i) => i + 1)
    .filter((n) => !usedLinks.has(n));

  return {
    children: spans.length ? spans : [{ _type: "span", _key: key(), text: "", marks: [] }],
    markDefs,
    missingLinks,
  };
}
