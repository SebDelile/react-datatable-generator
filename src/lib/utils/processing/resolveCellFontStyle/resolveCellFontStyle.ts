import { StyleInterface } from '../../types/StyleInterface';

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
) => {
  const rootStyle = getComputedStyle(ref);
  const bodyStyle: { [Key: string]: undefined | number | string } = {
    fontFamily: style.tableBodyFontFamily,
    fontSize: style.tableBodyFontSize,
    fontWeight: style.tableBodyFontWeight,
  };
  const headStyle: { [Key: string]: undefined | number | string } = {
    fontFamily: style.tableHeadFontFamily,
    fontSize: style.tableHeadFontSize,
    fontWeight: style.tableHeadFontWeight,
  };
  [bodyStyle, headStyle].forEach((element) => {
    Object.keys(element).forEach((key) => {
      if (element[key] === undefined || element[key] === 'inherit') {
        const styleKey = 'allPluginFont' + key.slice(4);
        element[key] = style[styleKey as keyof styleInterfaceAllPluginFont];
        if (element[key] === undefined || element[key] === 'inherit')
          element[key] = rootStyle[key as keyof fontStyleType];
      }
    });
  });

  return { bodyStyle, headStyle } as {
    bodyStyle: resolvedFontStyleType;
    headStyle: resolvedFontStyleType;
  };
};

type fontStyleType = {
  fontFamily: undefined | string;
  fontSize: undefined | string;
  fontWeight: undefined | number | string;
};

type resolvedFontStyleType = {
  fontFamily: string;
  fontSize: string;
  fontWeight: number | string;
};

type styleInterfaceAllPluginFont = {
  allPluginFontFamily: undefined | string;
  allPluginFontSize: undefined | string;
  allPluginFontWeight: undefined | number | string;
};
