import { pagingHandler } from './pagingHandler';
import { user1, user2, user3, user4, dataSample } from '../../mocks/dataSample';

describe('GIVEN the pagingHandler feature', () => {
  describe('WHEN it is called with itemsPerPage >= data.length', () => {
    test('THEN it returns unmodified data', () => {
      expect(pagingHandler(dataSample, 1, 5)).toEqual(dataSample);
      expect(pagingHandler(dataSample, 1, 4)).toEqual(dataSample);
      expect(pagingHandler(dataSample, 1, 3)).not.toEqual(dataSample);
    });
  });
  describe('WHEN it is called with itemsPerPage < data.length', () => {
    test('THEN it returns filtered data coresponding to page currentPage', () => {
      expect(pagingHandler(dataSample, 1, 2)).toEqual([user1, user2]);
      expect(pagingHandler(dataSample, 2, 2)).toEqual([user3, user4]);
      expect(pagingHandler(dataSample, 1, 3)).toEqual([user1, user2, user3]);
      expect(pagingHandler(dataSample, 2, 3)).toEqual([user4]);
    });
  });
});
