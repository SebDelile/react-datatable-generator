/**
 * Sort the data according to currentSort parameter.
 * Returns unmodified data if there is no key selected (null).
 * Sorts the data according to the key parameter, and use the type parameter to define which sort to apply (number, string or date).
 * @param {array} data - the  data to paginate.
 * @param {object} currentSort - the sorting parameter with a key, a direction and a type.
 * @memberof handlers
 * @return {array} the sorted data.
 */
export const sortHandler = (data, currentSort) => {
  const { key, direction, type } = currentSort;
  if (key === null) return data;
  if (type === 'number')
    return [...data].sort(
      (a, b) => (parseInt(a[key]) - parseInt(b[key])) * direction
    );
  if (type === 'string')
    return [...data].sort(
      (a, b) =>
        (a[key].toLowerCase() >= b[key].toLowerCase() ? 1 : -1) * direction
    );
  if (type === 'datestring')
    return [...data].sort(
      (a, b) => (new Date(a[key]) - new Date(b[key])) * direction
    );
};
