export const pagingHandler = (data, currentPage, itemsPerPage) => {
  if (itemsPerPage >= data.length) return data;
  return data.filter(
    (_, index) =>
      index >= (currentPage - 1) * itemsPerPage &&
      index <= Math.min(currentPage * itemsPerPage - 1, data.length - 1)
  );
};
