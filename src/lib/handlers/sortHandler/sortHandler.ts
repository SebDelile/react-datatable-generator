import { DataElementInterface, SortType } from '../../utils/types/types';

/**
 * Sort the data according to currentSort parameter.
 * Returns unmodified data if there is no key selected (null).
 * Sorts the data according to the key parameter, and use the type parameter to define which sort to apply (number, string or date).
 * Have some checks to assert if the value suits required format, if not it is pushed to end of sort.
 * @param {array} data - the  data to paginate.
 * @param {object} currentSort - the sorting parameter with a key, a direction and a type.
 * @memberof handlers
 * @function
 * @return {array} the sorted data.
 */
export const sortHandler = (
  data: DataElementInterface[],
  currentSort: SortType
): DataElementInterface[] => {
  const { key, direction, type } = currentSort;
  if (key === null) return data;
  if (type === 'number') {
    const toNumber = (x: string | number | boolean): number =>
      typeof x === 'number'
        ? x
        : typeof x === 'string'
        ? parseFloat(x)
        : x
        ? -1
        : 1;
    return [...data].sort(
      (a, b) => (toNumber(a[key]) - toNumber(b[key])) * direction
    );
  }
  if (type === 'string') {
    const toLowerCaseString = (x: string | number | boolean): string =>
      typeof x === 'string' ? x.toLowerCase() : x.toString().toLowerCase();
    return [...data].sort(
      (a, b) =>
        (toLowerCaseString(a[key]) >= toLowerCaseString(b[key]) ? 1 : -1) *
        direction
    );
  }
  if (type === 'datestring') {
    const toDate = (x: string | number | boolean): number =>
      typeof x === 'string' ? Date.parse(x) : NaN;
    return [...data].sort((a, b) => {
      const aToDate = toDate(a[key]);
      const bToDate = toDate(b[key]);
      return aToDate === NaN
        ? 1
        : bToDate === NaN
        ? -1
        : (toDate(a[key]) - toDate(b[key])) * direction;
    });
  }
};
