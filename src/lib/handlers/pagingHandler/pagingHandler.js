/**
 * Filter the data to return the items corresponding to the current page.
 * Returns unmodified data if there is less items than itemsPerPage value.
 * @param {array} data - the  data to paginate
 * @param {number} currentPage - the currently selected page to display.
 * @param {number} itemsPerPage - the number of items for each page.
 * @memberof handlers
 * @return {array} the data corresponding to the page to display.
 */
export const pagingHandler = (data, currentPage, itemsPerPage) => {
  if (itemsPerPage >= data.length) return data;
  return data.filter(
    (_, index) =>
      index >= (currentPage - 1) * itemsPerPage &&
      index <= Math.min(currentPage * itemsPerPage - 1, data.length - 1)
  );
};
