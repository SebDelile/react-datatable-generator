export const columnsMinWidthCalc = (
  headings,
  data,
  ref,
  cellInterTextLength
) => {
  if (!ref) return;
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const rootStyle = getComputedStyle(ref);
  context.font = `${rootStyle.fontSize} ${rootStyle.fontFamily}`;
  const bodyColumnMinWidth = headings.map((heading) =>
    data
      .map((item) => item[heading.key])
      .reduce((acc, cur) => Math.max(acc, context.measureText(cur).width), 0)
  );
  context.font = 'bold ' + context.font;
  const columnMinWidth = headings.map(
    (heading, index) =>
      Math.ceil(
        Math.max(
          bodyColumnMinWidth[index],
          context.measureText(heading.label).width +
            parseInt(rootStyle.fontSize) // is the sort icon in column header (1em width)
        )
      ) + cellInterTextLength
  );
  canvas.remove();
  return columnMinWidth;
};
