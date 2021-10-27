import { render, screen } from '@testing-library/react';
import { TableHeading } from './TableHeading.jsx';

const headings = [
  { key: 'firstName', label: 'First Name', type: 'string' },
  { key: 'lastName', label: 'Last Name', type: 'string' },
  { key: 'dateOfBirth', label: 'Date of Birth', type: 'datestring' },
];

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
    beforeEach(() =>
      render(
        <table>
          <TableHeading headings={headings} />
        </table>
      )
    );
    test('THEN it renders a table header row', () => {
      expect(screen.getAllByRole('columnheader')).toBeTruthy();
    });
    test('THEN it renders a table header row which contains the labels in the same sequence as in the headings props', () => {
      const headerCells = screen.getAllByRole('columnheader');
      for (let index in headerCells) {
        expect(headerCells[index].textContent).toEqual(headings[index].label);
      }
    });
  });
});
