import { convertLengthUnit } from '../convertLengthUnit/convertLengthUnit';
import { StyleInterface } from '../../types/StyleInterface';

/**
 * Calculate the total width of border of the table (body, head and cell) to take into account in the width of table.
 * @param {object} style - the style state of the store.
 * @returns {number} the sum of the widths of the table borders .
 * @function
 * @memberof utils
 */
export const getTableBorderWidth = (style: StyleInterface): number => {
  const bordersRaw = {
    body: style.tableBodyVerticalBorder,
    head: style.tableHeadVerticalBorder,
    cell: style.tableCellVerticalBorder,
  };
  const bordersWidth = {} as { [Key: string]: number };
  Object.keys(bordersRaw).forEach(
    (element: string): number =>
      (bordersWidth[element] = bordersRaw[element]
        ? convertLengthUnit(bordersRaw[element].split(' ')[0])
        : 0)
  );
  return 2 * Math.max(bordersWidth.body, bordersWidth.head) + bordersWidth.cell;
};
