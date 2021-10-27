import { render, screen, fireEvent } from '@testing-library/react';
import { TableHeading } from './TableHeading.jsx';
import { headingsSample } from '../../mocks/headingsSample.js';
import {
  currentSortNameAscending,
  currentSortNameDescending,
  currentSortNull,
} from '../../mocks/currentSortSamples.js';

const setCurrentSort = jest.fn();

describe('GIVEN the TableHeading component', () => {
  describe('WHEN it is called without headings props', () => {
    test('THEN it does not render any table headings', () => {
      render(
        <table>
          <TableHeading />
        </table>
      );
      expect(screen.queryByRole('columnheader')).toBeFalsy();
    });
  });
  describe('WHEN it is called with heading props, and a null current sort', () => {
    beforeEach(() => {
      render(
        <table>
          <TableHeading
            headings={headingsSample}
            currentSort={currentSortNull}
            setCurrentSort={setCurrentSort}
          />
        </table>
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
    test('THEN it renders a table header row with buttons and none is selected as currently selected sort', () => {
      expect(
        screen.queryByRole('button', { name: /currently selected as/i })
      ).toBeFalsy();
      expect(
        screen.getAllByRole('button', { name: /click to sort with this key/i })
      ).toBeTruthy();
      expect(
        screen.queryByAltText('ascending sort' || 'descending sort')
      ).toBeFalsy();
    });
    describe('AND WHEN the user click on one of the column headings', () => {
      test('THEN the setCurrentSort method is called with the name of the label and ascending sort as parameter', () => {
        fireEvent.click(screen.getByRole('button', { name: /Name/i }));
        expect(setCurrentSort).toHaveBeenCalledWith({
          key: 'name',
          direction: 1,
          type: 'string',
        });
      });
    });
  });
  describe('WHEN it is called with heading props, and an existing key as current sort and an ascending sort', () => {
    beforeEach(() => {
      render(
        <table>
          <TableHeading
            headings={headingsSample}
            currentSort={currentSortNameAscending}
            setCurrentSort={setCurrentSort}
          />
        </table>
      );
    });
    test('THEN it renders a table header row with buttons and one is selected as currently selected sort with ascending sort', () => {
      expect(
        screen.getByRole('button', {
          name: /currently selected as ascending sort/i,
        })
      ).toBeTruthy();
      expect(screen.getByAltText('ascending sort')).toBeTruthy();
    });
    describe('AND WHEN the user click on an other column headings', () => {
      test('THEN the setCurrentSort method is called with the name of the label and descending sort as parameter', () => {
        fireEvent.click(screen.getByRole('button', { name: /Job/i }));
        expect(setCurrentSort).toHaveBeenCalledWith({
          key: 'job',
          direction: 1,
          type: 'string',
        });
      });
    });
    describe('AND WHEN the user click on this column headings', () => {
      test('THEN the setCurrentSort method is called with the name of the label and descending sort as parameter', () => {
        fireEvent.click(screen.getByRole('button', { name: /Name/i }));
        expect(setCurrentSort).toHaveBeenCalledWith({
          key: 'name',
          direction: -1,
          type: 'string',
        });
      });
    });
  });
  describe('WHEN it is called with heading props, and an existing key as current sort and an ascending sort', () => {
    beforeEach(() => {
      render(
        <table>
          <TableHeading
            headings={headingsSample}
            currentSort={currentSortNameDescending}
            setCurrentSort={setCurrentSort}
          />
        </table>
      );
    });
    test('THEN it renders a table header row with buttons and one is selected as currently selected sort with descending sort', () => {
      expect(
        screen.getByRole('button', {
          name: /currently selected as descending sort/i,
        })
      ).toBeTruthy();
      expect(screen.getByAltText('descending sort')).toBeTruthy();
    });
    describe('AND WHEN the user click on an other column headings', () => {
      test('THEN the setCurrentSort method is called with the name of the label and descending sort as parameter', () => {
        fireEvent.click(screen.getByRole('button', { name: /Job/i }));
        expect(setCurrentSort).toHaveBeenCalledWith({
          key: 'job',
          direction: 1,
          type: 'string',
        });
      });
    });
    describe('AND WHEN the user click on this column headings', () => {
      test('THEN the setCurrentSort method is called with the name of the label and ascending sort as parameter', () => {
        fireEvent.click(screen.getByRole('button', { name: /Name/i }));
        expect(setCurrentSort).toHaveBeenCalledWith({
          key: 'name',
          direction: 1,
          type: 'string',
        });
      });
    });
    describe('AND WHEN the user click on an other column headings', () => {
      test('THEN the setCurrentSort method is called with the name of the label and modified type as parameter', () => {
        fireEvent.click(screen.getByRole('button', { name: /Date of Birth/i }));
        expect(setCurrentSort).toHaveBeenCalledWith({
          key: 'dateOfBirth',
          direction: 1,
          type: 'datestring',
        });
      });
    });
  });
});
