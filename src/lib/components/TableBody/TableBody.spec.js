import { render, screen } from '@testing-library/react';
import { TableBody } from './TableBody.jsx';

const headings = [
  { key: 'firstName', label: 'First Name', type: 'string' },
  { key: 'lastName', label: 'Last Name', type: 'string' },
  { key: 'dateOfBirth', label: 'Date of Birth', type: 'datestring' },
];

const data = [
  { firstName: 'John', dateOfBirth: '2000-01-01', lastName: 'Doe' },
  { firstName: 'Jane', lastName: 'Smith', dateOfBirth: '2010-12-31' },
];

describe('GIVEN the TableBody component', () => {
  describe('WHEN it is called without headings props', () => {
    test('THEN it does not render any table cell', () => {
      render(
        <table>
          <TableBody />
        </table>
      );
      expect(screen.queryByRole('cell')).toBeFalsy();
    });
  });
  describe('WHEN it is called with headings but without data props', () => {
    test('THEN it does not render any table cell', () => {
      render(
        <table>
          <TableBody headings={headings} />
        </table>
      );
      expect(screen.queryByRole('cell')).toBeFalsy();
    });
  });
  describe('WHEN it is called with correct props', () => {
    beforeEach(() =>
      render(
        <table>
          <TableBody headings={headings} data={data} />
        </table>
      )
    );
    test('THEN it renders as many row as data items', () => {
      expect(screen.getAllByRole('row').length).toEqual(data.length);
    });
    test('THEN it renders the table and the data position corresponds to the column header', () => {
      const dataCells = screen.getAllByRole('cell');
      expect(dataCells[0].textContent).toEqual('John');
      expect(dataCells[1].textContent).toEqual('Doe');
    });
  });
  describe('WHEN it is called with data props containing more keys than headings', () => {
    test('THEN it renders a table without the additionnal data', () => {
      const dataWithMoreKeys = data.map((user) => ({
        ...user,
        nationnality: 'American',
      }));
      render(
        <table>
          <TableBody headings={headings} data={dataWithMoreKeys} />
        </table>
      );
      expect(screen.queryByText('American')).toBeFalsy();
    });
  });
  describe('WHEN it is called with data props containing less keys than headings', () => {
    test('THEN it renders a table with empty cell for missing keys', () => {
      const dataWithLessKeys = data.map((user) => {
        const { lastName, ...userWithoutLastName } = user;
        return userWithoutLastName;
      });
      render(
        <table>
          <TableBody headings={headings} data={dataWithLessKeys} />
        </table>
      );
      const dataCells = screen.getAllByRole('cell');
      expect(dataCells.length).toEqual(headings.length * data.length);
      expect(dataCells[1].textContent).toEqual('');
      expect(screen.queryByText('Doe')).toBeFalsy();
    });
  });
  describe('WHEN it is called with data props containing a date', () => {
    test('THEN it renders a table with a US formated date', () => {
      render(
        <table>
          <TableBody headings={headings} data={data} />
        </table>
      );
      expect(screen.getByRole('cell', { name: /2000/ }).textContent).toEqual(
        '01/01/2000'
      );
      expect(screen.getByRole('cell', { name: /2010/ }).textContent).toEqual(
        '12/31/2010'
      );
    });
  });
});
