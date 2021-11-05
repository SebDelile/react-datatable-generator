export const filterHandler = (data, keyword) => {
  // check for input validity
  // data must be a non-empty array, containing only non-empty arrays or object, with no more nesting in it
  // keyword must be a string
  if (
    !Array.isArray(data) ||
    !data.length ||
    data.some(
      (element) => typeof element !== 'object' || !Object.keys(element).length
    ) ||
    data.some((element) =>
      Object.values(element).some(
        (subElement) => typeof subElement === 'object'
      )
    )
  )
    throw new Error(
      'Type error : please provide data parameter as an array of object'
    );
  if (typeof keyword !== 'string')
    throw new Error(
      'Type error : please provide keyword parameter as a string'
    );

  // if inputs are ok
  if (keyword === '') return data;

  const quoteSplittedKeywords = keyword.toLowerCase().split('"');
  if (quoteSplittedKeywords.length % 2 !== 1) {
    const lastElement = quoteSplittedKeywords.pop();
    quoteSplittedKeywords[quoteSplittedKeywords.length - 1] += lastElement;
  }
  const searchingKeywords = quoteSplittedKeywords
    .flatMap((word, index) => (index % 2 === 0 ? word.split(' ') : word))
    .filter((word) => word !== '');

  return data.filter((element) =>
    searchingKeywords.every((word) =>
      Object.values(element).some((value) =>
        value.toString().toLowerCase().includes(word)
      )
    )
  );
};
