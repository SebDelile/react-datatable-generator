import { StyleInterface } from '../../types/StyleInterface';
import { fontStyleType } from '../../types/types';

/**
 * take the style and root html node style to resolve the font style of the cell (converting inherit or undefined into actual style).
 * @param {HTMLElement} ref - the root html node.
 * @param {object} style - the style state of the store.
 * @returns {object} - the head and body font style object with keys fontFamily, fontSize and fontWeight.
 * @function
 * @memberof utils
 */
export const resolveCellFontStyle = (
  ref: HTMLElement,
  style: StyleInterface
): { bodyStyle: fontStyleType; headStyle: fontStyleType } => {
  const rootStyle = getComputedStyle(ref);
  const bodyStyle: fontStyleType = {
    fontFamily: style.tableBodyFontFamily,
    fontSize: style.tableBodyFontSize,
    fontWeight: style.tableBodyFontWeight,
  };
  const headStyle: fontStyleType = {
    fontFamily: style.tableHeadFontFamily,
    fontSize: style.tableHeadFontSize,
    fontWeight: style.tableHeadFontWeight,
  };
  [bodyStyle, headStyle].forEach((element) => {
    Object.keys(element).forEach((property) => {
      if (element[property] === undefined || element[property] === 'inherit') {
        element[property] =
          style[property.replace(/(?:tableBody|tableHead)/, 'allPlugin')];
        if (element[property] === undefined || element[property] === 'inherit')
          element[property] = rootStyle[property];
      }
    });
  });

  return { bodyStyle, headStyle };
};
