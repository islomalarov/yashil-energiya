import Link from "next/link";
import styles from "./page.module.scss";

export const ThePagination = ({
  page,
  totalPages,
  pageNumbers,
}: PaginationProps) => {
  return (
    <div className={styles.pagination}>
      <div className={styles.paginationBlock}>
        {page === 1 ? (
          <div className={styles.disabled}>{`<`}</div>
        ) : (
          <Link className={styles.paginationBtn} href={`?page=${page - 1}`}>
            {`<`}
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
        {page === totalPages ? (
          <div className={styles.disabled}> {`>`} </div>
        ) : (
          <Link className={styles.paginationBtn} href={`?page=${page + 1}`}>
            {`>`}
          </Link>
        )}
      </div>
    </div>
  );
};
