"use client";

import { useLayoutEffect, useRef } from "react";
import s from "./TheTable.module.scss";
import type { RichTextTable } from "@/types/richtext";

type Props = {
  value: RichTextTable;
};

// Cells are plain text. Stray line breaks from pasted text collapse into a
// space in HTML, exactly as the Hygraph renderer showed them.
function renderCell(text: string) {
  return text.trim() ? <p>{text}</p> : null;
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

  const rows = value.table?.rows ?? [];
  if (!rows.length) return null;

  // "Первая строка — заголовок" in the CMS.
  const [headRow, ...rest] = rows;
  const bodyRows = value.hasHeaderRow ? rest : rows;

  return (
    <div className={s.tableWrapper}>
      <table ref={tableRef} className={s.table}>
        {value.hasHeaderRow && (
          <thead>
            <tr>
              {(headRow.cells ?? []).map((cell, ci) => (
                <th key={ci} scope="col">
                  {renderCell(cell)}
                </th>
              ))}
            </tr>
          </thead>
        )}
        {bodyRows.length > 0 && (
          <tbody>
            {bodyRows.map((row) => (
              <tr key={row._key}>
                {(row.cells ?? []).map((cell, ci) => (
                  <td key={ci}>{renderCell(cell)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}
