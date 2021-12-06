import { convertLengthUnit } from '../convertLengthUnit/convertLengthUnit';

/**
 * Calculate the total width of border of the table (body, head and cell) to take into account in the width of table.
 * @param {object} style - the style state of the store.
 * @returns {number} the sum of the widths of the table borders .
 * @function
 * @memberof utils
 */
export const getTableBorderWidth = (style) => {
  const borders = {
    body: style.tableBodyVerticalBorder,
    head: style.tableHeadVerticalBorder,
    cell: style.tableCellVerticalBorder,
  };
  Object.keys(borders).forEach(
    (element) =>
      (borders[element] = borders[element]
        ? convertLengthUnit(borders[element].split(' ')[0])
        : 0)
  );
  return 2 * Math.max(borders.body, borders.head) + borders.cell;
};
