import { css } from '../../utils/style/emotion';
import { StyleInterface } from '../../utils/types/StyleInterface';

const styleSheet = (style: StyleInterface) => ({
  tableRow: css({
    '&:not(:first-of-type)': {
      borderTop: style.tableCellHorizontalBorder,
    },
    '&:not(:last-of-type):not([data-hideborderbottom])': {
      borderBottom: style.tableCellHorizontalBorder,
    },
    '&[data-oddrow] td': {
      background: style.tableOddRowBackground,
    },
    '& td[data-sortedcolumn]': {
      background: style.tableSortedColumnBackground,
    },
    '&[data-oddrow] td[data-sortedcolumn]': {
      background: style.tableSortedColumnOddRowBackground,
    },
    '&:hover td': {
      background: style.tableHoveredRowBackground,
    },
    '&:hover td[data-sortedcolumn]': {
      background: style.tableSortedColumnHoveredRowBackground,
    },
    '&[data-clickable]': {
      cursor: 'pointer',
    },
  }),
  cell: css({
    whiteSpace: 'nowrap',
    padding: style.tableCellPadding,
    '&:not(:first-of-type)': {
      borderLeft: style.tableCellVerticalBorder,
    },
    '&:not(:last-of-type)': {
      borderRight: style.tableCellVerticalBorder,
    },
    '&:first-of-type': {
      position: 'sticky',
      left: 0,
    },
  }),
  moreInfo: css({
    cursor: 'pointer',
    '&[data-hidden]': {
      display: 'none',
    },
  }),
  moreInfoTable: css({
    marginLeft: style.moreInfoTableMarginLeft,
    borderCollapse: 'collapse',
  }),
  moreInfoRow: css({
    background: style.moreInfoTableBackground,
    '&:not(:first-of-type)': {
      borderTop: style.moreInfoTableHorizontalBorder,
    },
    '&:not(:last-of-type)': {
      borderBottom: style.moreInfoTableHorizontalBorder,
    },
  }),
  moreInfoHeadCell: css({
    textAlign: 'left',
    padding: style.moreInfoTableCellPadding,
    fontFamily: style.moreInfoTableHeadFontFamily,
    fontSize: style.moreInfoTableHeadFontSize,
    fontWeight: style.moreInfoTableHeadFontWeight,
    color: style.moreInfoTableHeadColor,
  }),
  moreInfoBodyCell: css({
    textAlign: 'left',
    padding: style.moreInfoTableCellPadding,
    fontFamily: style.moreInfoTableBodyFontFamily,
    fontSize: style.moreInfoTableBodyFontSize,
    fontWeight: style.moreInfoTableBodyFontWeight,
    color: style.moreInfoTableBodyColor,
  }),
});

export default styleSheet;
