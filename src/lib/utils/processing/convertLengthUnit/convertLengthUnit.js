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
