import { sortHandler } from './sortHandler';
import {
  user1,
  user2,
  user3,
  user4,
  dataSample,
} from '../../mocks/dataSample.js';

describe('GIVEN the sortHandler feature', () => {
  describe('WHEN it is called with null key in currentSort', () => {
    test('THEN it returns unmodified data', () => {
      expect(
        sortHandler(dataSample, { key: null, direction: 1, type: 'string' })
      ).toEqual(dataSample);
    });
  });
  describe('WHEN it is called with any key but null and ascending direction in currentSort', () => {
    test('THEN it returns data sorting according to the specified key with an ascending sort', () => {
      expect(
        sortHandler(dataSample, { key: 'job', direction: 1, type: 'string' })
      ).toEqual([user2, user1, user3, user4]);
    });
  });
  describe('WHEN it is called with any key but null and descending direction in currentSort', () => {
    test('THEN it returns data sorting according to the specified key with an descending sort', () => {
      expect(
        sortHandler(dataSample, { key: 'job', direction: -1, type: 'string' })
      ).toEqual([user4, user3, user1, user2]);
    });
  });
  describe('WHEN it is called with any key but null and number type of data', () => {
    test('THEN it returns data sorting according to the specified key with an ascending sort for number', () => {
      expect(
        sortHandler(dataSample, { key: 'id', direction: 1, type: 'number' })
      ).toEqual([user2, user3, user4, user1]);
    });
  });
  describe('WHEN it is called with any key but null and datesrting type of data', () => {
    test('THEN it returns data sorting according to the specified key with an ascending sort for date', () => {
      expect(
        sortHandler(dataSample, {
          key: 'dateOfBirth',
          direction: 1,
          type: 'datestring',
        })
      ).toEqual([user4, user3, user1, user2]);
    });
  });
});
