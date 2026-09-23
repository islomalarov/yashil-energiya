// node --test scripts/sanity-migration/
//
// Fixtures mirror the Hygraph node shapes found by inventory.mjs.
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { originalAssetUrl } from "./lib/assets.mjs";
import {
  headingStyle,
  richTextToPortableText,
} from "./lib/richtext-to-portable-text.mjs";
import {
  textPreserved,
  validatePortableText,
} from "./lib/validate-portable-text.mjs";

const convert = (children) => richTextToPortableText({ children }, { seed: "test" });

const spans = (block) => block.children.map(({ text, marks }) => ({ text, marks }));

const cell = (text, extra = {}) => ({
  type: "table_cell",
  children: [{ type: "paragraph", children: [{ text, ...extra }] }],
});
const row = (...cells) => ({ type: "table_row", children: cells });

describe("paragraphs and marks", () => {
  it("maps leaf flags to decorators", () => {
    const { blocks, issues } = convert([
      {
        type: "paragraph",
        children: [
          { text: "10 GW", bold: true },
          { text: " plain " },
          { text: "1", superscript: true },
          { text: "it", italic: true, underline: true },
        ],
      },
    ]);

    assert.equal(blocks.length, 1);
    assert.equal(blocks[0].style, "normal");
    assert.deepEqual(spans(blocks[0]), [
      { text: "10 GW", marks: ["strong"] },
      { text: " plain ", marks: [] },
      { text: "1", marks: ["sup"] },
      { text: "it", marks: ["em", "underline"] },
    ]);
    assert.deepEqual(issues, []);
  });

  it("drops empty paragraphs like the current renderer", () => {
    const { blocks, stats } = convert([
      { type: "paragraph", children: [{ text: "" }] },
      { type: "paragraph", children: [{ text: "  " }] },
      { type: "paragraph", children: [{ text: "kept" }] },
    ]);
    assert.equal(blocks.length, 1);
    assert.equal(stats.droppedEmptyBlocks, 2);
  });

  it("normalizes CRLF inside text", () => {
    const { blocks } = convert([{ type: "paragraph", children: [{ text: "a\r\nb" }] }]);
    assert.equal(blocks[0].children[0].text, "a\nb");
  });
});

describe("links", () => {
  it("creates a link markDef shared by all child spans", () => {
    const { blocks } = convert([
      {
        type: "paragraph",
        children: [
          { text: "see " },
          {
            type: "link",
            href: "https://gazeta.uz/x",
            openInNewTab: true,
            children: [{ text: "Gazeta", bold: true }, { text: " article" }],
          },
        ],
      },
    ]);

    const [block] = blocks;
    assert.equal(block.markDefs.length, 1);
    const [def] = block.markDefs;
    assert.deepEqual(
      { _type: def._type, href: def.href, openInNewTab: def.openInNewTab },
      { _type: "link", href: "https://gazeta.uz/x", openInNewTab: true },
    );
    assert.deepEqual(block.children[1].marks, [def._key, "strong"]);
    assert.deepEqual(block.children[2].marks, [def._key]);
  });

  it("fixes links saved without a protocol and reports it", () => {
    const { blocks, issues } = convert([
      {
        type: "paragraph",
        children: [
          { type: "link", href: "president.uz/oz/lists/view/1", children: [{ text: "x" }] },
        ],
      },
    ]);
    assert.equal(blocks[0].markDefs[0].href, "https://president.uz/oz/lists/view/1");
    assert.deepEqual(issues.map((i) => i.type), ["link-missing-protocol-fixed"]);
  });

  it("keeps mailto and tel links untouched", () => {
    const { blocks, issues } = convert([
      {
        type: "paragraph",
        children: [
          { type: "link", href: "mailto:a@b.uz", children: [{ text: "mail" }] },
          { type: "link", href: "tel:+998555148844", children: [{ text: "call" }] },
        ],
      },
    ]);
    assert.deepEqual(
      blocks[0].markDefs.map((d) => d.href),
      ["mailto:a@b.uz", "tel:+998555148844"],
    );
    assert.deepEqual(issues, []);
  });
});

describe("headings and quotes", () => {
  it("shifts heading levels down by one, never above h2", () => {
    assert.equal(headingStyle("heading-one"), "h2");
    assert.equal(headingStyle("heading-three"), "h2");
    assert.equal(headingStyle("heading-four"), "h3");
  });

  it("converts heading-four, which the current renderer hides", () => {
    const { blocks } = convert([{ type: "heading-four", children: [{ text: "Conclusion:" }] }]);
    assert.equal(blocks[0].style, "h3");
  });

  it("converts a leaf-only block-quote into one blockquote block", () => {
    const { blocks } = convert([
      {
        type: "block-quote",
        children: [{ text: "\r\n" }, { text: "10 GW", bold: true }, { text: " capacity" }],
      },
    ]);
    assert.equal(blocks.length, 1);
    assert.equal(blocks[0].style, "blockquote");
  });
});

describe("lists", () => {
  it("unwraps list-item-child and skips empty items", () => {
    const { blocks } = convert([
      {
        type: "numbered-list",
        children: [
          { type: "list-item", children: [{ type: "list-item-child", children: [{ text: "one" }] }] },
          { type: "list-item", children: [{ type: "list-item-child", children: [{ text: "" }] }] },
          { type: "list-item", children: [{ type: "list-item-child", children: [{ text: "two" }] }] },
        ],
      },
    ]);
    assert.deepEqual(
      blocks.map((b) => [b.listItem, b.level, b.children[0].text]),
      [
        ["number", 1, "one"],
        ["number", 1, "two"],
      ],
    );
  });

  it("unwraps a paragraph inside list-item-child without issues", () => {
    const { blocks, issues } = convert([
      {
        type: "bulleted-list",
        children: [
          {
            type: "list-item",
            children: [
              {
                type: "list-item-child",
                children: [{ type: "paragraph", children: [{ text: "Solar", bold: true }, { text: " power" }] }],
              },
            ],
          },
        ],
      },
    ]);
    assert.deepEqual(spans(blocks[0]), [
      { text: "Solar", marks: ["strong"] },
      { text: " power", marks: [] },
    ]);
    assert.deepEqual(issues, []);
  });

  it("keeps a line break between several paragraphs in one item", () => {
    const { blocks, issues } = convert([
      {
        type: "bulleted-list",
        children: [
          {
            type: "list-item",
            children: [
              {
                type: "list-item-child",
                children: [
                  { type: "paragraph", children: [{ text: "end." }] },
                  { type: "paragraph", children: [{ text: "Start" }] },
                ],
              },
            ],
          },
        ],
      },
    ]);
    assert.equal(blocks[0].children.map((s) => s.text).join(""), "end.\nStart");
    assert.deepEqual(issues.map((i) => i.type), ["list-item-multi-paragraph"]);
  });

  it("maps nested lists to deeper levels", () => {
    const { blocks } = convert([
      {
        type: "bulleted-list",
        children: [
          {
            type: "list-item",
            children: [
              { type: "list-item-child", children: [{ text: "parent" }] },
              {
                type: "bulleted-list",
                children: [
                  { type: "list-item", children: [{ type: "list-item-child", children: [{ text: "child" }] }] },
                ],
              },
            ],
          },
        ],
      },
    ]);
    assert.deepEqual(blocks.map((b) => b.level), [1, 2]);
  });
});

describe("images", () => {
  const image = {
    type: "image",
    src: "https://us-west-2.graphassets.com/envid/output=format:webp/resize=width:100,height:50/handle123",
    handle: "handle123",
    title: "en.png",
    altText: "Electric power - main sources ",
    width: 100,
    height: 50,
    children: [{ text: "" }],
  };

  it("imports the original file, not the resized variant", () => {
    assert.equal(
      originalAssetUrl(image.src, image.handle),
      "https://us-west-2.graphassets.com/envid/handle123",
    );
  });

  it("uses altText (not the file name) as alt", () => {
    const { blocks } = convert([image]);
    assert.deepEqual(blocks[0], {
      _type: "imageBlock",
      _key: blocks[0]._key,
      _sanityAsset: "image@https://us-west-2.graphassets.com/envid/handle123",
      alt: "Electric power - main sources",
    });
  });

  it("reports images without alt text", () => {
    const { issues } = convert([{ ...image, altText: null }]);
    assert.deepEqual(issues.map((i) => i.type), ["image-missing-alt"]);
  });
});

describe("tables", () => {
  it("marks table_head rows as header rows", () => {
    const { blocks } = convert([
      {
        type: "table",
        children: [
          { type: "table_head", children: [row(cell("Type"), cell("Capacity"))] },
          { type: "table_body", children: [row(cell("Small\n  system"), cell("5 kW"))] },
        ],
      },
    ]);

    const [table] = blocks;
    assert.equal(table._type, "table");
    assert.deepEqual(table.rows.map((r) => r.isHeader), [true, false]);
    assert.equal(table.rows[1].cells[0].content[0].children[0].text, "Small\n  system");
  });

  it("infers a header from a leading all-bold row and reports it", () => {
    const { blocks, issues } = convert([
      {
        type: "table",
        children: [
          {
            type: "table_body",
            children: [row(cell("A", { bold: true }), cell("B", { bold: true })), row(cell("1"), cell("2"))],
          },
        ],
      },
    ]);
    assert.deepEqual(blocks[0].rows.map((r) => r.isHeader), [true, false]);
    assert.deepEqual(issues, [{ type: "table-header-inferred", firstRow: "A | B" }]);
  });

  it("does not infer a header when the first row is not all bold", () => {
    const { blocks } = convert([
      {
        type: "table",
        children: [{ type: "table_body", children: [row(cell("A", { bold: true }), cell("B"))] }],
      },
    ]);
    assert.deepEqual(blocks[0].rows.map((r) => r.isHeader), [false]);
  });
});

describe("robustness", () => {
  it("salvages text from unknown nodes and reports them", () => {
    const { blocks, issues } = convert([
      { type: "code-block", children: [{ text: "const x = 1" }] },
      { type: "iframe", url: "https://youtube.com/x", children: [{ text: "" }] },
    ]);
    assert.equal(blocks.length, 1);
    assert.deepEqual(issues.map((i) => i.type), [
      "unsupported-node-salvaged",
      "unsupported-node-dropped",
    ]);
  });

  it("produces identical keys on rerun (idempotent imports)", () => {
    const input = [{ type: "paragraph", children: [{ text: "same" }] }];
    assert.deepEqual(convert(input).blocks, convert(input).blocks);
  });

  it("output passes structural validation and preserves text", () => {
    const raw = {
      children: [
        { type: "heading-three", children: [{ text: "Title" }] },
        {
          type: "paragraph",
          children: [
            { text: "see " },
            { type: "link", href: "https://x.uz", children: [{ text: "x", bold: true }] },
          ],
        },
        {
          type: "table",
          children: [{ type: "table_body", children: [row(cell("A"), cell("B"))] }],
        },
      ],
    };
    const { blocks } = richTextToPortableText(raw, { seed: "doc" });
    assert.deepEqual(validatePortableText(blocks), []);
    assert.equal(textPreserved(raw, blocks), true);
  });
});
