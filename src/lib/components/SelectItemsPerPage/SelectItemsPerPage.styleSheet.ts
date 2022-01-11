import { css } from '../../utils/style/emotion';
import { StyleInterface } from '../../utils/types/StyleInterface';

const styleSheet = (style: StyleInterface) => ({
  wrapper: css({
    gridArea: 'selectItemsPerPage',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontFamily: style.selectItemsPerPageFontFamily,
    fontSize: style.selectItemsPerPageFontSize,
    fontWeight: style.selectItemsPerPageFontWeight,
    color: style.selectItemsPerPageColor,
  }),
  wrapperLarge: css({
    justifySelf: 'start',
  }),
  select: css({
    margin: '0 0.5rem',
    padding: '0.25rem',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    background: style.selectItemsPerPageSelectBackground,
    color: style.selectItemsPerPageSelectColor,
    border: style.selectItemsPerPageSelectBorder,
    borderRadius: style.selectItemsPerPageSelectBorderRadius,
  }),
});

export default styleSheet;
