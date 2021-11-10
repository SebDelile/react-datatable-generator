export const columnsMinWidthCalc = (headings, data) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = getComputedStyle(document.documentElement).font;
  const bodyColumnMinWidth = headings.map((heading) =>
    data
      .map((item) => item[heading.key])
      .reduce((acc, cur) => Math.max(acc, context.measureText(cur).width), 0)
  );
  context.font = 'bold ' + context.font;
  const columnMinWidth = headings.map((heading, index) =>
    Math.max(
      bodyColumnMinWidth[index],
      context.measureText(heading.label).width + 16 //get sort image width from options
    )
  );
  canvas.remove();
  return columnMinWidth;
};
