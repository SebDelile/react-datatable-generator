import { convertLengthUnit } from '../convertLengthUnit/convertLengthUnit';

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
