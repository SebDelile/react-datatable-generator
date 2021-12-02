import { css } from '../../utils/style/emotion';

const styleSheet = (style) => ({
  tableHead: css({
    background: style.tableHeadBackground,
    fontFamily: style.tableHeadFontFamily,
    fontSize: style.tableHeadFontSize,
    fontWeight: style.tableHeadFontWeight,
    color: style.tableHeadColor,
    textAlign: style.tableHeadTextAlign,
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
  button: css({
    border: 'none',
    background: 'none',
    color: 'inherit',
    font: 'inherit',
    cursor: 'pointer',
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
  }),
  sortIcon: css({
    height: '1em',
    width: '1em',
  }),
});

export default styleSheet;