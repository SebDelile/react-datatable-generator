/**
 * Format an input with the given format.
 * If format is a function, returns the result of the funciton with input as parameter.
 * If format is a string (keyword), returns a a formated input according to the scheme.
 * Default case returns the unformated data.
 * @param {string|number|boolean} input - the input to format.
 * @param {string|function} format - the format to apply.
 * @memberof utils
 * @function
 * @returns {string} - the formated input as a string.
 */
export const formatDisplayedData = (
  input: string | number | boolean,
  format: string | ((input: string | number | boolean) => string)
) => {
  if (typeof format === 'function') return format(input);
  switch (format) {
    case 'US-date':
      return typeof input === 'string'
        ? new Date(input).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
        : input;
    case 'US-currency':
      const inputAsNumber =
        typeof input === 'number'
          ? input
          : typeof input === 'string' && parseFloat(input) !== NaN
          ? parseFloat(input)
          : undefined;
      return inputAsNumber
        ? new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            currencyDisplay: 'symbol',
          }).format(inputAsNumber)
        : input;
    default:
      return input;
  }
};
