import { convertLengthUnit } from '../convertLengthUnit/convertLengthUnit';

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
