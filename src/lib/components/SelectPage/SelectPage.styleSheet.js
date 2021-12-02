import { css } from '../../utils/style/emotion';

const styleSheet = (style) => ({
  wrapper: css({
    gridArea: 'selectPage',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '0.25rem',
    fontFamily: style.selectPageFontFamily,
    fontSize: style.selectPageFontSize,
    fontWeight: style.selectPageFontWeight,
  }),
  wrapperLarge: css({
    justifySelf: 'end',
  }),
  button: css({
    padding: '0.5rem 1rem',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    color: style.selectPageButtonColor,
    background: style.selectPageButtonBackground,
    border: style.selectPageButtonBorder,
    borderRadius: style.selectPageButtonBorderRadius,
    '&[disabled]:not([data-active])': {
      padding: '0.5rem',
      color: style.selectPageButtonDisabledColor,
      background: style.selectPageButtonDisabledBackground,
      border: style.selectPageButtonDisabledBorder,
    },
    '&:not([disabled]):hover': {
      color: style.selectPageButtonHoveredColor,
      background: style.selectPageButtonHoveredBackground,
      border: style.selectPageButtonHoveredBorder,
    },
    '&[disabled][data-active]': {
      color: style.selectPageButtonActiveColor,
      background: style.selectPageButtonActiveBackground,
      border: style.selectPageButtonActiveBorder,
    },
    '&[data-hidden]': {
      display: 'none',
    },
  }),
});

export default styleSheet;
