import {
  HeadingsElementInterface,
  DataElementInterface,
} from '../../types/types';
import { StyleInterface } from '../../types/StyleInterface';
import { getCellInterTextLength } from '../getCellInterTextLength/getCellInterTextLength';
import { resolveCellFontStyle } from '../resolveCellFontStyle/resolveCellFontStyle';

/**
 * Calculate the min-width for each column (heading + data).
 * Uses the Canvas API to measure the length of the text of each cell and return the max for each column
 * Takes into account of the font style, cell inter text length and the sorting image of column headers.
 * @param {array} headings - the headings array.
 * @param {array} data - the data array.
 * @param {HTMLElement} ref - the ref to the pluggin html element, to recover font size and font family.
 * @param {object} style - the style state from the store.
 * @memberof utils
 * @function
 * @returns {array} - minwidth value for each column (in px) in the same sequence as the headings array.
 */
export const columnsMinWidthCalc = (
  headings: HeadingsElementInterface[],
  data: DataElementInterface[],
  ref: HTMLElement,
  style: StyleInterface
): number[] => {
  if (!ref) return;

  const { bodyStyle, headStyle } = resolveCellFontStyle(ref, style);

  //create canvas and test each body cell text length with applied style to find the longer
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = `${bodyStyle.fontWeight} ${bodyStyle.fontSize} ${bodyStyle.fontFamily}`;
  const bodyColumnMinWidth: number[] = headings.map((heading) =>
    data
      .map((item) => item[heading.key])
      .reduce<number>(
        (acc: number, cur: string): number =>
          Math.max(acc, context.measureText(cur).width),
        0
      )
  );
  //compare with the column header cell text length and keep the longer, then add the intertextLength (padding+border)
  context.font = `${headStyle.fontWeight} ${headStyle.fontSize} ${headStyle.fontFamily}`;
  const cellInterTextLength = getCellInterTextLength(style);
  const columnMinWidth: number[] = headings.map(
    (heading, index): number =>
      Math.ceil(
        Math.max(
          bodyColumnMinWidth[index],
          context.measureText(heading.label).width +
            parseInt(headStyle.fontSize) // is the sort icon in column header (1em width)
        )
      ) + cellInterTextLength
  );
  canvas.remove();
  return columnMinWidth;
};
