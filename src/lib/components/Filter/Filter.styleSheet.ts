import { css } from '../../utils/style/emotion';
import { StyleInterface } from '../../utils/types/StyleInterface';

const styleSheet = (style: StyleInterface) => ({
  wrapper: css({
    gridArea: 'filter',
    height: '1.5rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
    fontFamily: style.filterFontFamily,
    fontSize: style.filterFontSize,
    fontWeight: style.filterFontWeight,
    color: style.filterColor,
  }),
  wrapperLarge: css({
    justifySelf: 'end',
  }),
  label: css({
    padding: '0 0.5rem',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    color: 'inherit',
  }),
  input: css({
    padding: '0.125rem 0.5rem',
    font: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    background: style.filterInputBackground,
    color: style.filterInputColor,
    border: style.filterInputBorder,
    borderRadius: style.filterInputBorderRadius,
  }),
  resetButton: css({
    position: 'absolute',
    right: 0,
    height: '100%',
    background: 'none',
    border: 'none',
    padding: '0.25rem',
  }),
  resetButtonImage: css({
    height: '1rem',
  }),
});

export default styleSheet;
