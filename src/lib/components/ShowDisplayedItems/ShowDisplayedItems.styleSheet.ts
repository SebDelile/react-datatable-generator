import { css } from '../../utils/style/emotion';
import { StyleInterface } from '../../utils/types/StyleInterface';

const styleSheet = (style: StyleInterface) => ({
  wrapper: css({
    gridArea: 'showDisplayedItems',
    textAlign: 'center',
    margin: 0,
    fontFamily: style.showDisplayedItemsFontFamily,
    fontSize: style.showDisplayedItemsFontSize,
    fontWeight: style.showDisplayedItemsFontWeight,
    color: style.showDisplayedItemsColor,
  }),
  wrapperLarge: css({
    justifySelf: 'start',
    textAlign: 'left',
  }),
});

export default styleSheet;
