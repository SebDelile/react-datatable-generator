import { render, screen } from '@testing-library/react';
import { TableBody } from './TableBody.jsx';
import { dataSample } from '../../mocks/dataSample.js';
import { headingsSample } from '../../mocks/headingsSample.js';

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
          <TableBody headings={headingsSample} />
        </table>
      );
      expect(screen.queryByRole('cell')).toBeFalsy();
    });
  });
  describe('WHEN it is called with correct props', () => {
    beforeEach(() =>
      render(
        <table>
          <TableBody headings={headingsSample} data={dataSample} />
        </table>
      )
    );
    test('THEN it renders as many row as data items', () => {
      expect(screen.getAllByRole('row').length).toEqual(dataSample.length);
    });
    test('THEN it renders the table and the data position corresponds to the column header', () => {
      const dataCells = screen.getAllByRole('cell');
      expect(dataCells[0].textContent).toEqual('120');
      expect(dataCells[1].textContent).toEqual('John Doe');
      expect(dataCells[2].textContent).toEqual('Engineer');
    });
  });
  describe('WHEN it is called with data props containing more keys than headings', () => {
    test('THEN it renders a table without the additionnal data', () => {
      const dataSampleWithMoreKeys = dataSample.map((user) => ({
        ...user,
        nationnality: 'American',
      }));
      render(
        <table>
          <TableBody headings={headingsSample} data={dataSampleWithMoreKeys} />
        </table>
      );
      expect(screen.queryByText('American')).toBeFalsy();
    });
  });
  describe('WHEN it is called with data props containing less keys than headings', () => {
    test('THEN it renders a table with empty cell for missing keys', () => {
      const dataSampleWithLessKeys = dataSample.map((user) => {
        const { job, ...userWithoutJob } = user;
        return userWithoutJob;
      });
      render(
        <table>
          <TableBody headings={headingsSample} data={dataSampleWithLessKeys} />
        </table>
      );
      const dataCells = screen.getAllByRole('cell');
      expect(dataCells.length).toEqual(
        headingsSample.length * dataSample.length
      );
      expect(dataCells[2].textContent).toEqual('');
      expect(screen.queryByText('Engineer')).toBeFalsy();
    });
  });
  describe('WHEN it is called with data props containing a date', () => {
    test('THEN it renders a table with a US formated date', () => {
      render(
        <table>
          <TableBody headings={headingsSample} data={dataSample} />
        </table>
      );
      expect(screen.getByText('04/16/1987')).toBeTruthy();
      expect(screen.queryByText('1987-04-16')).toBeFalsy();
    });
  });
});
