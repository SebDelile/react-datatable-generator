import { filterHandler } from './filterHandler.js';

const user1 = { id: 12, name: 'John Doe', job: 'Engineer' };
const user2 = { id: 34, name: 'Jane Smith', job: 'Doctor' };
const user3 = { id: 56, name: 'Arsène Lupin', job: 'Gentleman Thief' };
const user4 = { id: 78, name: 'Snow White', job: 'Princess' };

const dataSample = [user1, user2, user3, user4];

describe('GIVEN the filterHandler feature', () => {
  describe('WHEN it is called with anything but a non-empty array', () => {
    test('THEN it returns an error', () => {
      expect(() => filterHandler([], 'keyword')).toThrow();
      expect(() => filterHandler({ invalid: true }, 'keyword')).toThrow();
      expect(() => filterHandler('string', 'keyword')).toThrow();
      expect(() => filterHandler(123, 'keyword')).toThrow();
      expect(() => filterHandler(undefined, 'keyword')).toThrow();
      expect(() => filterHandler(null, 'keyword')).toThrow();
      expect(() => filterHandler(true, 'keyword')).toThrow();
    });
  });
  describe('WHEN it is called with an array containing anything but non-empty objects', () => {
    test('THEN it returns an error', () => {
      expect(() => filterHandler([1, 2, { key: 1 }], 'keyword')).toThrow();
      expect(() => filterHandler(['1', '2', { key: 1 }], 'keyword')).toThrow();
      expect(() =>
        filterHandler([true, false, { key: 1 }], 'keyword')
      ).toThrow();
      expect(() =>
        filterHandler([null, undefined, { key: 1 }], 'keyword')
      ).toThrow();
      expect(() => filterHandler([{}, {}, { key: 1 }], 'keyword')).toThrow();
    });
  });
  describe('WHEN it is called with an array containing nested objects or arrays', () => {
    test('THEN it returns an error', () => {
      expect(() =>
        filterHandler(
          [{ key: 1, otherkey: { nesting: true } }, { key: 2 }],
          'keyword'
        )
      ).toThrow();
      expect(() =>
        filterHandler(
          [{ key: 1, otherkey: [3, [4, 5]] }, { key: 2 }],
          'keyword'
        )
      ).toThrow();
      expect(() =>
        filterHandler(
          [
            [1, 2],
            [3, [4, 5]],
          ],
          'keyword'
        )
      ).toThrow();
      expect(() =>
        filterHandler(
          [
            [1, 2],
            [3, { nesting: true }],
          ],
          'keyword'
        )
      ).toThrow();
    });
  });
  describe('WHEN it is called with an array containing only objects', () => {
    test('THEN it does not return an error', () => {
      expect(() =>
        filterHandler([{ key: 1, otherkey: true }, { key: 2 }], 'keyword')
      ).not.toThrow();
      expect(() =>
        filterHandler(
          [
            [1, 2, 3],
            ['1', '2', '3'],
          ],
          'keyword'
        )
      ).not.toThrow();
    });
  });
  describe('WHEN it is called with anything but a string', () => {
    test('THEN it returns the data without modification', () => {
      expect(() => filterHandler(dataSample, 1)).toThrow();
      expect(() => filterHandler(dataSample, [1, 2])).toThrow();
      expect(() =>
        filterHandler(dataSample, { key: 1, otherKey: 2 })
      ).toThrow();
      expect(() => filterHandler(dataSample, true)).toThrow();
      expect(() => filterHandler(dataSample, null)).toThrow();
      expect(() => filterHandler(dataSample, undefined)).toThrow();
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
