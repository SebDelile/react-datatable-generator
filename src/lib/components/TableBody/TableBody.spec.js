import { screen } from '@testing-library/react';
import { TableBody } from './TableBody';
import { dataSample } from '../../mocks/dataSample';
import { headingsSample } from '../../mocks/headingsSample';
import { renderWithStore } from '../../utils/test/renderWithStore';
import '@testing-library/jest-dom';

jest.mock('../TableRow/TableRow.jsx', () => ({
  __esModule: true,
  TableRow: (props) => <tr {...props} />,
}));

describe('GIVEN the TableBody component', () => {
  describe('WHEN it is called ', () => {
    beforeEach(() => {
      renderWithStore(
        <table>
          <TableBody />
        </table>,
        {
          headings: headingsSample,
          displayedData: dataSample,
        }
      );
    });
    test('THEN it renders as many row as data items', () => {
      expect(screen.getAllByRole('row').length).toEqual(dataSample.length);
    });
    test('THEN the rows have parity props being even or odd depending on index in displayedData', () => {
      screen.getAllByRole('row').forEach((row, index) => {
        expect(row).toHaveAttribute('parity', index % 2 === 0 ? 'even' : 'odd');
      });
    });
  });
  describe('WHEN it is called with displayedData being empty', () => {
    test('THEN it renders an unique cell with message on no match found', () => {
      renderWithStore(
        <table>
          <TableBody />
        </table>,
        {
          headings: headingsSample,
          displayedData: [],
        }
      );
      expect(screen.getByRole('cell', { name: /no match/i })).toBeTruthy();
    });
  });
});
