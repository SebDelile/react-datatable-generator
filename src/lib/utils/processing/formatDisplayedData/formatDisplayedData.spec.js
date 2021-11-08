import { formatDisplayedData } from './formatDisplayedData.js';

describe('GIVEN the formatDisplayedData function', () => {
  describe('WHEN it is called with input to be formated as a US date', () => {
    test('THEN it returns a US formated date', () => {
      expect(formatDisplayedData('1987-04-16', 'US-date')).toEqual(
        '04/16/1987'
      );
    });
  });
  describe('WHEN it is called with input to be formated as a US currency', () => {
    test('THEN it returns a US formated currency', () => {
      expect(formatDisplayedData('198704.16', 'US-currency')).toEqual(
        '$198,704.16'
      );
    });
  });
  describe('WHEN it is called with in put to be formated with custom format', () => {
    test('THEN it returns the input with custom format', () => {
      expect(
        formatDisplayedData('19870416', (a) => a + ' random format')
      ).toEqual('19870416 random format');
    });
  });
});
