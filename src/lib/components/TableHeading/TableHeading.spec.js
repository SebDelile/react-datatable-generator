import { render, screen, fireEvent } from '@testing-library/react';
import { TableHeading } from './TableHeading.jsx';

const headings = [
  { key: 'firstName', label: 'First Name', type: 'string' },
  { key: 'lastName', label: 'Last Name', type: 'string' },
  { key: 'dateOfBirth', label: 'Date of Birth', type: 'datestring' },
];

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
  describe('WHEN it is called with heading props', () => {
    beforeEach(() => {
      const currentSort = {
        key: null,
        direction: 1,
        type: 'string',
      };
      render(
        <table>
          <TableHeading headings={headings} currentSort={currentSort} />
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
        expect(headerCells[index].textContent).toEqual(headings[index].label);
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
  });
  describe('WHEN it is called with currentSort containing an existing label as key key and positive direction', () => {
    test('THEN it renders a table header row with buttons and one is selected as currently selected sort with ascending sort', () => {
      const currentSort = {
        key: 'lastName',
        direction: 1,
        type: 'string',
      };
      render(
        <table>
          <TableHeading headings={headings} currentSort={currentSort} />
        </table>
      );
      expect(
        screen.getByRole('button', {
          name: /currently selected as ascending sort/i,
        })
      ).toBeTruthy();
      expect(screen.getByAltText('ascending sort')).toBeTruthy();
    });
  });
  describe('WHEN it is called with currentSort containing an existing label as key key and negative direction', () => {
    test('THEN it renders a table header row with buttons and one is selected as currently selected sort with descending sort', () => {
      const currentSort = {
        key: 'lastName',
        direction: -1,
        type: 'string',
      };
      render(
        <table>
          <TableHeading headings={headings} currentSort={currentSort} />
        </table>
      );
      expect(
        screen.getByRole('button', {
          name: /currently selected as descending sort/i,
        })
      ).toBeTruthy();
      expect(screen.getByAltText('descending sort')).toBeTruthy();
    });
  });
  describe('WHEN it is called with currentSort containing null as key key and the user click on one of the column headings', () => {
    test('THEN the setCurrentSort method is called with the name of the label and ascending sort as parameter', () => {
      const currentSort = {
        key: null,
        direction: 1,
        type: 'string',
      };
      render(
        <table>
          <TableHeading
            headings={headings}
            currentSort={currentSort}
            setCurrentSort={setCurrentSort}
          />
        </table>
      );
      fireEvent.click(screen.getByRole('button', { name: /Last Name/i }));
      expect(setCurrentSort).toHaveBeenCalledWith({
        key: 'lastName',
        direction: 1,
        type: 'string',
      });
    });
  });
  describe('WHEN it is called with currentSort containing an existing heading as key key and positive direction and the user click on an other column headings', () => {
    test('THEN the setCurrentSort method is called with the name of the label and descending sort as parameter', () => {
      const currentSort = {
        key: 'lastName',
        direction: 1,
        type: 'string',
      };
      render(
        <table>
          <TableHeading
            headings={headings}
            currentSort={currentSort}
            setCurrentSort={setCurrentSort}
          />
        </table>
      );
      fireEvent.click(screen.getByRole('button', { name: /First Name/i }));
      expect(setCurrentSort).toHaveBeenCalledWith({
        key: 'firstName',
        direction: 1,
        type: 'string',
      });
    });
  });
  describe('WHEN it is called with currentSort containing an existing heading as key key and negative direction and the user click on an other column headings', () => {
    test('THEN the setCurrentSort method is called with the name of the label and descending sort as parameter', () => {
      const currentSort = {
        key: 'lastName',
        direction: -1,
        type: 'string',
      };
      render(
        <table>
          <TableHeading
            headings={headings}
            currentSort={currentSort}
            setCurrentSort={setCurrentSort}
          />
        </table>
      );
      fireEvent.click(screen.getByRole('button', { name: /First Name/i }));
      expect(setCurrentSort).toHaveBeenCalledWith({
        key: 'firstName',
        direction: 1,
        type: 'string',
      });
    });
  });
  describe('WHEN it is called with currentSort containing an existing heading as key key and positive direction and the user click on this column headings', () => {
    test('THEN the setCurrentSort method is called with the name of the label and descending sort as parameter', () => {
      const currentSort = {
        key: 'lastName',
        direction: 1,
        type: 'string',
      };
      render(
        <table>
          <TableHeading
            headings={headings}
            currentSort={currentSort}
            setCurrentSort={setCurrentSort}
          />
        </table>
      );
      fireEvent.click(screen.getByRole('button', { name: /Last Name/i }));
      expect(setCurrentSort).toHaveBeenCalledWith({
        key: 'lastName',
        direction: -1,
        type: 'string',
      });
    });
  });
  describe('WHEN it is called with currentSort containing an existing heading as key key and negative direction and the user click on this column headings', () => {
    test('THEN the setCurrentSort method is called with the name of the label and ascending sort as parameter', () => {
      const currentSort = {
        key: 'lastName',
        direction: -1,
        type: 'string',
      };
      render(
        <table>
          <TableHeading
            headings={headings}
            currentSort={currentSort}
            setCurrentSort={setCurrentSort}
          />
        </table>
      );
      fireEvent.click(screen.getByRole('button', { name: /Last Name/i }));
      expect(setCurrentSort).toHaveBeenCalledWith({
        key: 'lastName',
        direction: 1,
        type: 'string',
      });
    });
  });
  describe('WHEN it is called with currentSort containing an existing heading as key key and the user click on an other column headings', () => {
    test('THEN the setCurrentSort method is called with the name of the label and modified type as parameter', () => {
      const currentSort = {
        key: 'lastName',
        direction: -1,
        type: 'string',
      };
      render(
        <table>
          <TableHeading
            headings={headings}
            currentSort={currentSort}
            setCurrentSort={setCurrentSort}
          />
        </table>
      );
      fireEvent.click(screen.getByRole('button', { name: /Date of Birth/i }));
      expect(setCurrentSort).toHaveBeenCalledWith({
        key: 'dateOfBirth',
        direction: 1,
        type: 'datestring',
      });
    });
  });
});
