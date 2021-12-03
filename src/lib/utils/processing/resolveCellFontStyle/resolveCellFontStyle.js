export const resolveCellFontStyle = (ref, style) => {
  const rootStyle = getComputedStyle(ref);
  const bodyStyle = {
    fontFamily: style.tableBodyFontFamily,
    fontSize: style.tableBodyFontSize,
    fontWeight: style.tableBodyFontWeight,
  };
  const headStyle = {
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
