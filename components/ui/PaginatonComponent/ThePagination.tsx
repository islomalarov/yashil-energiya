import Link from "next/link";
import styles from "./page.module.scss";

export const ThePagination = ({
  page,
  totalPage,
  prevPage,
  nextPage,
  pageNumbers,
}: PaginationProps) => {
  return (
    <div className={styles.pagination}>
      <div className={styles.paginationBlock}>
        {page === 1 ? (
          <div className={styles.disabled}>Oldinga</div>
        ) : (
          <Link className={styles.paginationBtn} href={`?page=${prevPage}`}>
            Oldinga
          </Link>
        )}
        {pageNumbers.map((pageNumber: number) => (
          <Link
            key={pageNumber}
            href={`?page=${pageNumber}`}
            className={
              page === pageNumber ? styles.active : styles.paginationBtn
            }
          >
            {pageNumber}
          </Link>
        ))}
        {page === totalPage ? (
          <div className={styles.disabled}>Orqaga</div>
        ) : (
          <Link className={styles.paginationBtn} href={`?page=${nextPage}`}>
            Orqaga
          </Link>
        )}
      </div>
    </div>
  );
};
