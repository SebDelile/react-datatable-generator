import { css } from '../../utils/style/emotion';

const styleSheet = (style) => ({
  wrapper: css({
    gridArea: 'showDisplayedItems',
    textAlign: 'center',
    margin: 0,
    fontFamily: style.showDisplayedItemsFontFamily,
    fontSize: style.showDisplayedItemsFontSize,
    fontWeight: style.showDisplayedItemsFontWeight,
    color: style.showDisplayedItemsButtonColor,
  }),
  wrapperLarge: css({
    justifySelf: 'start',
    textAlign: 'left',
  }),
});

export default styleSheet;
