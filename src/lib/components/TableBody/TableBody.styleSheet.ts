import { css } from '../../utils/style/emotion';
import { StyleInterface } from '../../utils/types/StyleInterface';

const styleSheet = (style: StyleInterface) => ({
  tableBody: css({
    borderTop: style.tableBodyHorizontalBorder,
    borderBottom: style.tableBodyHorizontalBorder,
    borderLeft: style.tableBodyVerticalBorder,
    borderRight: style.tableBodyVerticalBorder,
    background: style.tableBodyBackground,
    fontFamily: style.tableBodyFontFamily,
    fontSize: style.tableBodyFontSize,
    fontWeight: style.tableBodyFontWeight,
    color: style.tableBodyColor,
    textAlign: style.tableBodyTextAlign,
  }),
  noMatch: css({
    padding: style.tableCellPadding,
    textAlign: 'center',
  }),
});

export default styleSheet;
