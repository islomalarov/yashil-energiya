"use client";

import { useLayoutEffect, useRef } from "react";
import s from "./TheTable.module.scss";
import {
  renderRichLeaves,
  richLeavesHaveText,
  type RichTextLeaf,
} from "../RichText/renderRichLeaves";

type Props = {
  // The Hygraph RichText `table` node.
  elem: unknown;
};

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

function getType(v: unknown): string {
  return isRecord(v) && typeof v["type"] === "string" ? v["type"] : "";
}

function getChildren(v: unknown): unknown[] {
  if (!isRecord(v)) return [];
  const c = v["children"];
  return Array.isArray(c) ? c : [];
}

// A cell's content is a list of `paragraph` nodes whose children are inline
// leaves. Render each paragraph as its own <p> so multi-line cells keep breaks.
function renderCell(cell: unknown, keyPrefix: string) {
  const nodes = getChildren(cell);

  const paragraphs = nodes.filter((n) => getType(n) === "paragraph");
  // Fallback: some cells hold inline leaves directly, without a paragraph wrap.
  const source = paragraphs.length ? paragraphs : [{ children: nodes }];

  return source.map((para, i) => {
    const leaves = getChildren(para) as RichTextLeaf[];
    if (!richLeavesHaveText(leaves)) return null;
    return <p key={`${keyPrefix}-p-${i}`}>{renderRichLeaves(leaves, `${keyPrefix}-p-${i}`)}</p>;
  });
}

// True when every non-empty leaf in the cell is bold — used to detect an
// implicit header row when the CMS didn't emit a dedicated `table_head`.
function cellIsBold(cell: unknown): boolean {
  let sawText = false;
  let allBold = true;

  const visit = (nodes: unknown[]) => {
    for (const n of nodes) {
      if (!isRecord(n)) continue;
      if (typeof n["text"] === "string" && n["text"].trim() !== "") {
        sawText = true;
        if (n["bold"] !== true) allBold = false;
      }
      const ch = n["children"];
      if (Array.isArray(ch)) visit(ch);
    }
  };

  visit(getChildren(cell));
  return sawText && allBold;
}

function getRowCells(row: unknown): unknown[] {
  return getChildren(row).filter((c) => {
    const t = getType(c);
    return t === "table_cell" || t === "table_header_cell";
  });
}

function rowIsHeader(row: unknown): boolean {
  const cells = getRowCells(row);
  if (!cells.length) return false;
  // Header if the row is a dedicated header row or all cells are bold.
  const allHeaderCells = cells.every((c) => getType(c) === "table_header_cell");
  return allHeaderCells || cells.every(cellIsBold);
}

export default function TheTable({ elem }: Props) {
  const tableRef = useRef<HTMLTableElement>(null);

  // The second column is pinned right after the first, so its `left` offset
  // must equal the first column's rendered width. Column widths are dynamic,
  // so measure the first column and expose it to CSS as `--col1-width`.
  useLayoutEffect(() => {
    const table = tableRef.current;
    if (!table) return;

    const measure = () => {
      const firstCell = table.rows[0]?.cells[0];
      if (!firstCell) return;
      table.style.setProperty("--col1-width", `${firstCell.offsetWidth}px`);
    };

    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(table);
    return () => ro.disconnect();
  }, []);

  // Collect all rows, whether nested under table_head/table_body or direct.
  const headRows: unknown[] = [];
  const bodyRows: unknown[] = [];

  for (const child of getChildren(elem)) {
    const type = getType(child);
    if (type === "table_head") {
      for (const r of getChildren(child)) {
        if (getType(r) === "table_row") headRows.push(r);
      }
    } else if (type === "table_body") {
      for (const r of getChildren(child)) {
        if (getType(r) === "table_row") bodyRows.push(r);
      }
    } else if (type === "table_row") {
      bodyRows.push(child);
    }
  }

  // When there is no explicit head, promote a leading all-bold row to a header.
  if (!headRows.length && bodyRows.length && rowIsHeader(bodyRows[0])) {
    headRows.push(bodyRows.shift());
  }

  if (!headRows.length && !bodyRows.length) return null;

  return (
    <div className={s.tableWrapper}>
      <table ref={tableRef} className={s.table}>
        {headRows.length > 0 && (
          <thead>
            {headRows.map((row, ri) => (
              <tr key={`h-${ri}`}>
                {getRowCells(row).map((cell, ci) => (
                  <th key={`h-${ri}-${ci}`} scope="col">
                    {renderCell(cell, `h-${ri}-${ci}`)}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
        )}
        {bodyRows.length > 0 && (
          <tbody>
            {bodyRows.map((row, ri) => (
              <tr key={`b-${ri}`}>
                {getRowCells(row).map((cell, ci) => (
                  <td key={`b-${ri}-${ci}`}>{renderCell(cell, `b-${ri}-${ci}`)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}
