/**
 * Calculate the min-width for each column (heading + data).
 * Uses the Canvas API to measure the length of the text of each cell and return the max for each column
 * Takes into account of the cellInterTextLength (padding left+right), the sorting image and boldness of column headers.
 * @param {array} headings - the headings array
 * @param {array} data - the data array
 * @param {HTMLElement} ref - the ref to the pluggin html element, to recover font size and font family
 * @param {number} cellInterTextLength - the padding left + right value (in px) to take into account in column width
 * @memberof utils
 * @returns {array} - minwidth value for each column (in px) in the same sequence as the headings array.
 */
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
