import { render, screen } from '@testing-library/react';
import { Table } from './Table.jsx';

const headings = [
  { key: 'firstName', label: 'First Name' },
  { key: 'lastName', label: 'Last Name' },
  { key: 'dateOfBirth', label: 'Date of Birth' },
];

const data = [
  { firstName: 'John', dateOfBirth: '2000-01-01', lastName: 'Doe' },
  { firstName: 'Jane', lastName: 'Smith', dateOfBirth: '2010-12-31' },
];

describe('GIVEN the Table component', () => {
  describe('WHEN it is called without headings props', () => {
    test('THEN it renders an empty table', () => {
      render(<Table />);
      expect(screen.queryByRole('table')).toBeFalsy();
    });
  });
  describe('WHEN it is called with headings but without data props', () => {
    test('THEN it renders a table with a header row but not any tbody cell', () => {
      render(<Table headings={headings} />);
      expect(screen.getByRole('table')).toBeTruthy();
      expect(screen.getAllByRole('columnheader')).toBeTruthy();
      expect(screen.queryByRole('cell')).toBeFalsy();
    });
  });
  describe('WHEN it is called with correct props', () => {
    beforeEach(() => render(<Table headings={headings} data={data} />));
    test('THEN it renders a table with a header row and as many row as data items', () => {
      expect(screen.getAllByRole('columnheader')).toBeTruthy();
      expect(screen.getAllByRole('row').length).toEqual(1 + data.length);
    });
    test('THEN it renders the table and the header row contains the labels in the same sequence as in the headings props', () => {
      const headerCells = screen.getAllByRole('columnheader');
      for (let index in headerCells) {
        expect(headerCells[index].textContent).toEqual(headings[index].label);
      }
    });
    test('THEN it renders the table and the data position corresponds to the column header', () => {
      const headerCells = screen.getAllByRole('columnheader');
      const dataCells = screen.getAllByRole('cell');
      for (let index in dataCells) {
        const keyHead = headings.find(
          (item) =>
            item.label === headerCells[index % headings.length].textContent
        ).key;
        const user = data[Math.floor(index / headings.length)];
        const keyData = Object.keys(user).find(
          (key) => user[key] === dataCells[index].textContent
        );
        expect(keyData).toEqual(keyHead);
      }
    });
  });
  describe('WHEN it is called with data props containing more keys than headings', () => {
    test('THEN it renders a table without the additionnal data', () => {
      const dataWithMoreKeys = data.map((user) => ({
        ...user,
        nationnality: 'American',
      }));
      render(<Table headings={headings} data={dataWithMoreKeys} />);
      expect(screen.queryByText('American')).toBeFalsy();
    });
  });
  describe('WHEN it is called with data props containing less keys than headings', () => {
    test('THEN it renders a table with empty cell for missing keys', () => {
      const dataWithLessKeys = data.map((user) => {
        const { lastName, ...userWithoutLastName } = user;
        return userWithoutLastName;
      });
      render(<Table headings={headings} data={dataWithLessKeys} />);
      expect(screen.getAllByRole('cell').length).toEqual(
        headings.length * data.length
      );
      expect(screen.queryByText('Doe' && 'Smith')).toBeFalsy();
    });
  });
});
