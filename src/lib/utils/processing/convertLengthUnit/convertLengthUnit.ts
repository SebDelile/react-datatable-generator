/**
 * take a length to analyze value and unit and then return the value converted in pixel if needed.
 * Support px and rem input, return the unconverted value + a warn for other units.
 * @param {string|number} length - the length as a string as it is set in customStyle prop or returned by getComputedStyle().
 * @returns {number} - the value converted into pixel length.
 * @memberof utils
 * @function
 */
export const convertLengthUnit = (length: string | number): number => {
  if (!length) return 0;
  if (typeof length === 'number') return length;
  const unit: string = length.replace(/[\d.-]/g, '');
  const value: number = parseFloat(length);
  switch (unit) {
    case 'px':
      return value;
    case 'rem':
      return (
        value * parseFloat(getComputedStyle(document.documentElement).fontSize)
      );
    default:
      console.warn(
        `warning, unsuitable unit (${unit}) passed to border or padding customStyle prop. It can cause a wrong column width calcultation.`
      );
      return value;
  }
};
