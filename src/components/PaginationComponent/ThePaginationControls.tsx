import { Pagination } from "@mui/material";
import s from "./ThePaginationControls.module.scss";

interface ThePaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export const ThePaginationControls = ({
  totalPages,
  currentPage,
  setCurrentPage,
}: ThePaginationProps) => {
  return (
    <div className={s.paginationContainer}>
      <Pagination
        className={s.pagination}
        count={totalPages}
        page={currentPage}
        siblingCount={0}
        onChange={(_, value) => setCurrentPage(value)}
        variant="outlined"
        shape="rounded"
      />
    </div>
  );
};
