/**
 * Format an input with the given format.
 * If format is a function, returns the result of the funciton with input as parameter.
 * If format is a string (keyword), returns a a formated input according to the scheme.
 * Default case returns the unformated data.
 * @param {string|number} input - the input to format.
 * @param {string|function} format - the format to apply.
 * @memberof utils
 * @function
 * @returns {string} - the formated input as a string.
 */
export const formatDisplayedData = (input, format) => {
  if (typeof format === 'function') return format(input);
  switch (format) {
    case 'US-date':
      return new Date(input).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    case 'US-currency':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        currencyDisplay: 'symbol',
      }).format(input);
    default:
      return input;
  }
};
