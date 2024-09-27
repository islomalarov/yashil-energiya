export const getPageNumbers = (
  page: number,
  offsetNumber: number,
  totalPages: number
) => {
  const pageNumbersArray = [];
  for (let i = page - offsetNumber; i <= page + offsetNumber; i++) {
    if (i >= 1 && i <= totalPages) {
      pageNumbersArray.push(i);
    }
  }
  return pageNumbersArray;
};
