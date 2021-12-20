import { screen } from '@testing-library/react';
import { TableBody } from './TableBody';
import { dataSample } from '../../mocks/dataSample';
import { headingsSample } from '../../mocks/headingsSample';
import { renderWithStore } from '../../utils/test/renderWithStore';
import '@testing-library/jest-dom';

jest.mock('../TableRow/TableRow.tsx', () => ({
  __esModule: true,
  //need to convert some props to be suitable for a html tag attribute
  TableRow: (props: { [Key: string]: any }) => {
    const lowerCaseProps = {} as { [MockedKey: string]: string };
    Object.keys(props).forEach((prop) => {
      const value =
        typeof props[prop] === 'object'
          ? JSON.stringify(props[prop])
          : props[prop]?.toString();
      lowerCaseProps[prop.toLowerCase()] = value;
    });
    return <tr {...lowerCaseProps} />;
  },
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
        if (index % 2 !== 0) expect(row).toHaveAttribute('isoddrow', 'true');
        else expect(row).toHaveAttribute('isoddrow', 'false');
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
