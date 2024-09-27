export const getTotalPages = (itemsCount: number, perPage: number) => {
  return Math.ceil(itemsCount / perPage);
};
