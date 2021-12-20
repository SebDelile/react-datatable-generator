import { filterHandler } from './filterHandler';
import { user1, user2, user3, user4, dataSample } from '../../mocks/dataSample';

describe('GIVEN the filterHandler feature', () => {
  describe('WHEN it is called with an array containing only objects', () => {
    test('THEN it does not return an error', () => {
      expect(() =>
        filterHandler([{ key: 1, otherkey: true }, { key: 2 }], 'keyword')
      ).not.toThrow();
    });
  });
  describe('WHEN it is called with an empty string as keyword', () => {
    test('THEN it returns the data without modification', () => {
      const filteredData = filterHandler(dataSample, '');
      expect(filteredData).toEqual(dataSample);
    });
  });
  describe('WHEN it is called with a valid data and a keyword containing only one word (no space)', () => {
    test('THEN it returns the filtered data according to keyword', () => {
      expect(filterHandler(dataSample, 'John')).toEqual([user1]);
      expect(filterHandler(dataSample, '56')).toEqual([user3]);
      expect(filterHandler(dataSample, 'it')).toEqual([user2, user4]);
      expect(filterHandler(dataSample, 'i')).toEqual(dataSample);
    });
  });
  describe('WHEN it is called with a valid data and a keyword containing several words (spaced by space char)', () => {
    test('THEN it returns the filtered data according to intersection of these whitespace-separated keywords', () => {
      expect(filterHandler(dataSample, 'John Engineer')).toEqual([user1]);
      expect(filterHandler(dataSample, '56 white')).toEqual([]);
      expect(filterHandler(dataSample, 'it doctor')).toEqual([user2]);
    });
  });
  describe('WHEN it is called with a valid data and a keyword containing several words (spaced by space char) between double quotes', () => {
    test('THEN it returns the filtered data according to the exact expression between double quote', () => {
      expect(filterHandler(dataSample, '"John Doe"')).toEqual([user1]);
      expect(filterHandler(dataSample, '"John Engineer"')).toEqual([]);
      expect(filterHandler(dataSample, '"ow Whi" Pri')).toEqual([user4]);
      expect(filterHandler(dataSample, 'cess "ow Whi" Pri')).toEqual([user4]);
      expect(
        filterHandler(dataSample, '"Arsène Lupin" "Gentleman thief"')
      ).toEqual([user3]);
      expect(
        filterHandler(dataSample, '"Arsène Lupin" "thief Gentleman"')
      ).toEqual([]);
    });
  });
});
