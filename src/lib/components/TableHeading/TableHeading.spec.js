import { screen, fireEvent } from '@testing-library/react';
import { TableHeading } from './TableHeading.jsx';
import { headingsSample } from '../../mocks/headingsSample.js';
import { currentSortNameAscending } from '../../mocks/currentSortSamples.js';
import { renderWithStore } from '../../utils/test/renderWithStore.js';
import '@testing-library/jest-dom';

const dispatch = jest.fn();
const columnsMinWidth = Array(headingsSample.length).fill(10);

describe('GIVEN the TableHeading component', () => {
  describe('WHEN it is called', () => {
    beforeEach(() => {
      renderWithStore(
        <table>
          <TableHeading />
        </table>,
        {
          headings: headingsSample,
          currentSort: currentSortNameAscending,
          displayedColumns: headingsSample.length,
          columnsMinWidth: columnsMinWidth,
          dispatch: dispatch,
        }
      );
    });
    test('THEN it renders a table header row with buttons inside', () => {
      expect(screen.getAllByRole('columnheader')).toBeTruthy();
      expect(screen.getAllByRole('button')).toBeTruthy();
    });
    test('THEN it renders a table header row which contains the labels in the same sequence as in the headings props', () => {
      const headerCells = screen.getAllByRole('columnheader');
      for (let index in headerCells) {
        expect(headerCells[index].textContent).toEqual(
          headingsSample[index].label
        );
      }
    });
    test('THEN it renders a table header row with buttons and one is selected as currently selected sort with ascending sort', () => {
      expect(
        screen.getByRole('button', {
          name: /currently selected as ascending sort/i,
        })
      ).toBeTruthy();
      expect(screen.getByAltText('ascending sort')).toBeTruthy();
    });
    describe('AND WHEN the user click on one of the column headings not being already selected', () => {
      test('THEN the setCurrentSort method is called with the item corresponding to the name of the button being clicked', () => {
        fireEvent.click(screen.getByRole('button', { name: /Job/i }));
        expect(dispatch).toHaveBeenCalledWith({
          type: 'setCurrentSort',
          payload: {
            key: 'job',
            type: 'string',
          },
        });
      });
    });
    describe('AND WHEN the user click on one of the column headings being already selected', () => {
      test('THEN the setCurrentSort method is called with the item corresponding to the name of the button being clicked', () => {
        fireEvent.click(screen.getByRole('button', { name: /Name/i }));
        expect(dispatch).toHaveBeenCalledWith({
          type: 'setCurrentSort',
          payload: {
            key: 'name',
            type: 'string',
          },
        });
      });
    });
  });
  describe('WHEN it is called with one column not being displayed', () => {
    beforeEach(() => {
      renderWithStore(
        <table>
          <TableHeading />
        </table>,
        {
          headings: headingsSample,
          currentSort: currentSortNameAscending,
          displayedColumns: headingsSample.length - 1,
          columnsMinWidth: columnsMinWidth,
          dispatch: dispatch,
        }
      );
    });
    test('THEN only the last column is not displayed ', () => {
      const lastColumnsHeader = screen.getAllByRole('columnheader').slice(-1);
      const otherColumnsHeader = screen
        .getAllByRole('columnheader')
        .slice(0, -1);
      expect(lastColumnsHeader[0].classList.contains('srOnly')).toBeTruthy();
      expect(
        otherColumnsHeader.some((header) => header.classList.contains('srOnly'))
      ).toBeFalsy();
    });
    test('THEN all of header cells have a min-width inline style property, unless the one not being displayed', () => {
      const lastColumnsHeader = screen.getAllByRole('columnheader').slice(-1);
      const otherColumnsHeader = screen
        .getAllByRole('columnheader')
        .slice(0, -1);
      expect(lastColumnsHeader[0]).not.toHaveStyle(
        `min-width: ${columnsMinWidth[columnsMinWidth - 1]}`
      );
      otherColumnsHeader.forEach((header, i) => {
        expect(header).toHaveStyle(`min-width: ${columnsMinWidth[i]}px`);
      });
    });
  });
});
