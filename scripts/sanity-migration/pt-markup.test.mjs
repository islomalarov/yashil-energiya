// node --test scripts/sanity-migration/pt-markup.test.mjs
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { blockToMarkup, markupToChildren } from "./lib/pt-markup.mjs";

let n = 0;
const key = () => `k${n++}`;

const block = {
  _type: "block",
  _key: "b1",
  style: "normal",
  markDefs: [{ _type: "link", _key: "L1", href: "https://gazeta.uz", openInNewTab: true }],
  children: [
    { _type: "span", _key: "s1", text: "10 GW", marks: ["strong"] },
    { _type: "span", _key: "s2", text: " capacity", marks: [] },
    { _type: "span", _key: "s3", text: "1", marks: ["sup"] },
    { _type: "span", _key: "s4", text: ", see ", marks: [] },
    { _type: "span", _key: "s5", text: "the report", marks: ["L1", "em"] },
  ],
};

const plain = (children) => children.map(({ text, marks }) => ({ text, marks }));

describe("blockToMarkup", () => {
  it("tags decorators and numbers links", () => {
    const { text, links } = blockToMarkup(block);
    assert.equal(text, "<b>10 GW</b> capacity<sup>1</sup>, see <a1><i>the report</i></a1>");
    assert.deepEqual(links.map((l) => l.href), ["https://gazeta.uz"]);
  });
});

describe("markupToChildren", () => {
  it("round-trips text and marks", () => {
    const { text, links } = blockToMarkup(block);
    const { children, markDefs, missingLinks } = markupToChildren(text, links, key);
    const linkKey = markDefs[0]._key;
    assert.deepEqual(plain(children), [
      { text: "10 GW", marks: ["strong"] },
      { text: " capacity", marks: [] },
      { text: "1", marks: ["sup"] },
      { text: ", see ", marks: [] },
      { text: "the report", marks: [linkKey, "em"] },
    ]);
    assert.equal(markDefs[0].href, "https://gazeta.uz");
    assert.equal(markDefs[0].openInNewTab, true);
    assert.notEqual(linkKey, "L1");
    assert.deepEqual(missingLinks, []);
  });

  it("accepts tags moved by the translator", () => {
    const { links } = blockToMarkup(block);
    const { children } = markupToChildren(
      "Hisobotni <a1><i>bu yerda</i></a1> ko'ring: <b>10 GVt</b><sup>1</sup>.",
      links,
      key,
    );
    assert.deepEqual(
      children.map((c) => c.text),
      ["Hisobotni ", "bu yerda", " ko'ring: ", "10 GVt", "1", "."],
    );
  });

  it("merges neighbouring spans with the same marks", () => {
    const { children } = markupToChildren("<b>a</b><b>b</b> c", [], key);
    assert.deepEqual(plain(children), [
      { text: "ab", marks: ["strong"] },
      { text: " c", marks: [] },
    ]);
  });

  it("reports a link the translation dropped", () => {
    const { links } = blockToMarkup(block);
    assert.deepEqual(markupToChildren("Faqat matn.", links, key).missingLinks, [1]);
  });

  it("rejects unbalanced or unknown tags", () => {
    assert.throws(() => markupToChildren("<b>open", [], key), /unclosed/);
    assert.throws(() => markupToChildren("close</i>", [], key), /without opening/);
    assert.throws(() => markupToChildren("<a2>x</a2>", [{ href: "x" }], key), /unknown link/);
    assert.throws(() => markupToChildren("<strong>x</strong>", [], key), /unknown tag/);
  });
});
