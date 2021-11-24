import { screen, fireEvent } from '@testing-library/react';
import { extendedDataSample } from '../../mocks/extendedDataSample.js';
import { renderWithStore } from '../../utils/test/renderWithStore.js';
import { SelectPage } from './SelectPage.jsx';

const dispatch = jest.fn();
const filteredData = extendedDataSample; //12 items inside

describe('GIVEN the SelectPage component', () => {
  describe('WHEN it is called', () => {
    beforeEach(() =>
      renderWithStore(<SelectPage />, {
        currentPage: 2,
        dispatch: dispatch,
        filteredData: filteredData,
        itemsPerPage: 3,
      })
    );
    test('THEN it renders a bunch of buttons : "Previous + one for each page (text=page) + "Next"', () => {
      expect(
        screen.getAllByRole('button').map((button) => button.textContent)
      ).toEqual(['Previous', '1', '2', '3', '4', 'Next']);
    });
    test('THEN the button corresponding to currentPage is disabled', () => {
      expect(screen.getByRole('button', { name: 2 }).disabled).toBeTruthy();
    });
    describe('AND WHEN the user click on a button containing a page number', () => {
      test('THEN setCurrentPage function is fired with this page number as parameter', () => {
        fireEvent.click(screen.getByRole('button', { name: '3' }));
        expect(dispatch).toHaveBeenCalledWith({
          type: 'setCurrentPage',
          payload: '3',
        });
      });
    });
    describe('AND WHEN the user click on a "previous" button', () => {
      test('THEN setCurrentPage function is fired with this currentPage-1 as parameter', () => {
        fireEvent.click(screen.getByRole('button', { name: 'Previous' }));
        expect(dispatch).toHaveBeenCalledWith({
          type: 'setCurrentPage',
          payload: 'Previous',
        });
      });
    });
    describe('AND WHEN the user click on a "next" button', () => {
      test('THEN setCurrentPage function is fired with this currentPage+1 as parameter', () => {
        fireEvent.click(screen.getByRole('button', { name: 'Next' }));
        expect(dispatch).toHaveBeenCalledWith({
          type: 'setCurrentPage',
          payload: 'Next',
        });
      });
    });
  });
  describe('WHEN it is called with currentPage being 1', () => {
    test('THEN previous button is disabled', () => {
      renderWithStore(<SelectPage />, {
        currentPage: 1,
        dispatch: dispatch,
        filteredData: filteredData,
        itemsPerPage: 3,
      });
      expect(
        screen.getByRole('button', { name: 'Previous' }).disabled
      ).toBeTruthy();
    });
  });
  describe('WHEN it is called with currentPage being equal to last page', () => {
    test('THEN next button is disabled', () => {
      renderWithStore(<SelectPage />, {
        currentPage: Math.floor(filteredData.length / 3),
        dispatch: dispatch,
        filteredData: filteredData,
        itemsPerPage: 3,
      });
      expect(
        screen.getByRole('button', { name: 'Next' }).disabled
      ).toBeTruthy();
    });
  });
  describe('WHEN it is called with a number of pages being bigger than 7', () => {
    describe('AND WHEN currentPage is lower or equal to 4', () => {
      test('THEN there are only 9 buttons, buttons 6 to second to last are replaced by a button "..." (disabled)', () => {
        renderWithStore(<SelectPage />, {
          currentPage: 2,
          dispatch: dispatch,
          filteredData: filteredData,
          itemsPerPage: 1,
        });
        expect(
          screen.getAllByRole('button').map((button) => button.textContent)
        ).toEqual(['Previous', '1', '2', '3', '4', '5', '...', '12', 'Next']);
        expect(
          screen.getByRole('button', { name: '...' }).disabled
        ).toBeTruthy();
      });
    });
    describe('AND WHEN currentPage is among the last 4', () => {
      test('THEN there are only 9 buttons, buttons 2 to fifth from the end are replaced by a button "..." (disabled)', () => {
        renderWithStore(<SelectPage />, {
          currentPage: 10,
          dispatch: dispatch,
          filteredData: filteredData,
          itemsPerPage: 1,
        });
        expect(
          screen.getAllByRole('button').map((button) => button.textContent)
        ).toEqual(['Previous', '1', '...', '8', '9', '10', '11', '12', 'Next']);
        expect(
          screen.getByRole('button', { name: '...' }).disabled
        ).toBeTruthy();
      });
    });
    describe('AND WHEN currentPage is neither among the first 4 nor the last 4', () => {
      test('THEN there are only 9 buttons, buttons 2 to currentPage-2 and from currentPage+2 to numberOfPage-1 are replaced by buttons "..." (disabled)', () => {
        renderWithStore(<SelectPage />, {
          currentPage: 7,
          dispatch: dispatch,
          filteredData: filteredData,
          itemsPerPage: 1,
        });
        expect(
          screen.getAllByRole('button').map((button) => button.textContent)
        ).toEqual(['Previous', '1', '...', '6', '7', '8', '...', '12', 'Next']);
        expect(
          screen
            .getAllByRole('button', { name: '...' })
            .every((button) => button.disabled)
        ).toBeTruthy();
      });
    });
  });
});
