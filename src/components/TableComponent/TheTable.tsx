"use client";

import { useLayoutEffect, useRef } from "react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import s from "./TheTable.module.scss";
import { richTextMarks } from "../RichText/portableTextMarks";
import type { RichTextTable, RichTextTableCell } from "@/types/richtext";

type Props = {
  value: RichTextTable;
};

// A cell holds simple rich text: one <p> per paragraph so multi-line cells
// keep their breaks.
const cellComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
  },
  marks: richTextMarks,
};

function renderCell(cell: RichTextTableCell) {
  return cell.content?.length ? (
    <PortableText value={cell.content} components={cellComponents} />
  ) : null;
}

export default function TheTable({ value }: Props) {
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

  // Header rows are flagged explicitly in the CMS (`isHeader`).
  const rows = value.rows ?? [];
  const headRows = rows.filter((row) => row.isHeader);
  const bodyRows = rows.filter((row) => !row.isHeader);

  if (!rows.length) return null;

  return (
    <div className={s.tableWrapper}>
      <table ref={tableRef} className={s.table}>
        {headRows.length > 0 && (
          <thead>
            {headRows.map((row) => (
              <tr key={row._key}>
                {(row.cells ?? []).map((cell) => (
                  <th key={cell._key} scope="col">
                    {renderCell(cell)}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
        )}
        {bodyRows.length > 0 && (
          <tbody>
            {bodyRows.map((row) => (
              <tr key={row._key}>
                {(row.cells ?? []).map((cell) => (
                  <td key={cell._key}>{renderCell(cell)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}
