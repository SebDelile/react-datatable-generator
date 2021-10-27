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
