import { DataElementInterface } from '../../utils/types/types';

/**
 * Filter the data to return the items corresponding to the current page.
 * Returns unmodified data if there is less items than itemsPerPage value.
 * @param {array} data - the  data to paginate
 * @param {number} currentPage - the currently selected page to display.
 * @param {number} itemsPerPage - the number of items for each page.
 * @memberof handlers
 * @function
 * @return {array} the data corresponding to the page to display.
 */
export const pagingHandler = (
  data: DataElementInterface[],
  currentPage: number,
  itemsPerPage: number
): DataElementInterface[] => {
  if (itemsPerPage >= data.length) return data;
  return data.slice(
    (currentPage - 1) * itemsPerPage,
    Math.min(currentPage * itemsPerPage, data.length)
  );
};
