export default function getPageNumbers(
  page: number,
  offsetNumber: number,
  totalPage: number
) {
  const pageNumbersArray = [] as number[];
  for (let i = page - offsetNumber; i <= page + offsetNumber; i++) {
    if (i >= 1 && i <= totalPage) {
      pageNumbersArray.push(i);
    }
  }
  return pageNumbersArray;
}
