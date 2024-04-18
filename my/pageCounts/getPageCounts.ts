export default function getPageCounts(
  itemsCount: number,
  perPage: number,
  page: number
) {
  const totalPage = Math.ceil(itemsCount / perPage);
  const prevPage = page - 1 > 0 ? page - 1 : 1;
  const nextPage = page + 1;
  return { totalPage, prevPage, nextPage };
}
