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
