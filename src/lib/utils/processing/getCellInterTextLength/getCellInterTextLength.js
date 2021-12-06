import { convertLengthUnit } from '../convertLengthUnit/convertLengthUnit';

/**
 * Sum the padding left + right + vertical border of the cell to return the length between txt of 2 adjacent cells.
 * @param {object} style - the style state of the store.
 * @returns {number} the lentgh between the text of 2 adjacent cells .
 * @function
 * @memberof utils
 */
export const getCellInterTextLength = (style) => {
  const cellVerticalBorder = style.tableCellVerticalBorder
    ? convertLengthUnit(style.tableCellVerticalBorder.split(' ')[0])
    : 0;
  const cellPadding = style.tableCellPadding
    ? style.tableCellPadding.split(' ')
    : undefined;
  const cellHorizontalPaddings = cellPadding
    ? cellPadding.length === 1
      ? 2 * convertLengthUnit(cellPadding[0])
      : cellPadding.length === 2
      ? 2 * convertLengthUnit(cellPadding[1])
      : convertLengthUnit(cellPadding[1]) + convertLengthUnit(cellPadding[3])
    : 0; // => 4 values
  return cellVerticalBorder + cellHorizontalPaddings;
};
