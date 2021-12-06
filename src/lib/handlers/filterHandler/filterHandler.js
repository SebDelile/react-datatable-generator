/**
 * Filter the data according to the filter keyword.
 * Filtering is not sensitive to case but do not use a normalizer function for accent or hyphens.
 * Return unmodified data if keyword is empty.
 * Has an exact search behavior for parts of the string being between double quotes.
 * Builds the searchingKeywords array by spliting the string :
 *  1) according to double quote to isolate fragment inside and outside of double quotes.
 *  2) splitting the fragment outside of double quote according to spaces.
 * Then make the fitlering research according to all elements of the searchingKeyword array.
 * @param {array} data - the  data to filter.
 * @param {string} keyword - the keyword string use to filter.
 * @memberof handlers
 * @function
 * @return {array} the filtered data according to keyword.
 */
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
