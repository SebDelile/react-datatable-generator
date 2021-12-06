/**
 * take a length to analyze value and unit and then return the value converted in pixel if needed.
 * Support px and rem input, return the unconverted value + a warn for other units.
 * @param {string} length - the length as a string as it is set in customStyle prop or returned by getComputedStyle().
 * @returns {number} - the value converted into pixel length.
 * @memberof utils
 * @function
 */
export const convertLengthUnit = (length) => {
  if (!length) return 0;
  const unit = length.toString().replace(/[\d.-]/g, '');
  const value = parseFloat(length);
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
