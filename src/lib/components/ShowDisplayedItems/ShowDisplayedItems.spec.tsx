import { screen } from '@testing-library/react';
import { extendedDataSample } from '../../mocks/extendedDataSample';
import { renderWithStore } from '../../utils/test/renderWithStore';
import { ShowDisplayedItems } from './ShowDisplayedItems';

describe('GIVEN the ShowDisplayedItems component', () => {
  describe('WHEN it is called and the items to display is equal than the items per page', () => {
    test('THEN it renders a sentence with a range between 1s item of the page and last item of the page', () => {
      renderWithStore(<ShowDisplayedItems />, {
        currentPage: 2,
        itemsPerPage: 5,
        filteredData: extendedDataSample,
        data: extendedDataSample,
      });
      expect(screen.getByText(/6 to 10 of 12/i)).toBeTruthy();
    });
  });
  describe('WHEN it is called and the items to display is less than the items per page', () => {
    test('THEN it renders a sentence with a range between 1s item of the page and last item of the page', () => {
      renderWithStore(<ShowDisplayedItems />, {
        currentPage: 3,
        itemsPerPage: 5,
        filteredData: extendedDataSample,
        data: extendedDataSample,
      });
      expect(screen.getByText(/11 to 12 of 12/i)).toBeTruthy();
    });
  });
  describe('WHEN it is called and there is no displayed items', () => {
    test('THEN it renders a sentence to state there is no item to display', () => {
      renderWithStore(<ShowDisplayedItems />, {
        currentPage: 1,
        itemsPerPage: 5,
        filteredData: [],
        data: extendedDataSample,
      });
      expect(screen.getByText(/no entry/i)).toBeTruthy();
    });
  });
  describe('WHEN it is called and data have been filtrated', () => {
    test('THEN it additionnaly displays the number of unflitred data', () => {
      renderWithStore(<ShowDisplayedItems />, {
        currentPage: 1,
        itemsPerPage: 5,
        filteredData: extendedDataSample.slice(0, 6),
        data: extendedDataSample,
      });
      expect(screen.getByText(/1 to 5 of 6/i && /12 total/i)).toBeTruthy();
    });
  });
});
