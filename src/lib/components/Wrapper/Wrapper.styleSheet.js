import { css } from '../../utils/style/emotion';

const styleSheet = (style) => ({
  wrapper: css({
    display: 'grid',
    width: '100%',
    gridTemplateAreas: `
    "selectItemsPerPage"
    "filter"
    "table"
    "showDisplayedItems"
    "selectPage"`,
    justifyItems: 'center',
    alignItems: 'center',
    justifyContent: 'stretch',
    gap: '0.5rem',
    padding: '0.5rem 0',
    background: style.allPluginBackground,
    fontFamily: style.allPluginFontFamily,
    fontSize: style.allPluginFontSize,
    fontWeight: style.allPluginFontWeight,
    color: style.allPluginColor,
    boxSizing: 'border-box',
    '& *, & *::before, & *::after': {
      boxSizing: 'border-box',
    },
  }),
  wrapperLarge: css({
    gridTemplateAreas: `
    "selectItemsPerPage filter"
    "table table"
    "showDisplayedItems showDisplayedItems"
    "selectPage selectPage"`,
  }),
  wrapperExtraLarge: css({
    gridTemplateAreas: `
    "selectItemsPerPage filter"
    "table table"
    "showDisplayedItems selectPage"`,
  }),
});

export default styleSheet;
