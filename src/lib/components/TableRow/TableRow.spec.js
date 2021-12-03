import { screen, fireEvent } from '@testing-library/react';
import { TableRow } from './TableRow';
import { headingsSample } from '../../mocks/headingsSample';
import { renderWithStore } from '../../utils/test/renderWithStore';
import { currentSortNameAscending } from '../../mocks/currentSortSamples';
import { user1 } from '../../mocks/dataSample';
import { matchers } from '@emotion/jest';

expect.extend(matchers);
const dispatch = jest.fn();
const columnCount = headingsSample.length;

describe('GIVEN the TableRow component', () => {
  describe('WHEN it is called with all columns being displayed', () => {
    beforeEach(() => {
      renderWithStore(
        <table>
          <tbody>
            <TableRow item={user1} isOddRow={true} />
          </tbody>
        </table>,
        {
          headings: headingsSample,
          moreInfoOpenList: [],
          displayedColumns: columnCount,
          currentSort: currentSortNameAscending,
          dispatch: dispatch,
        }
      );
    });
    test('THEN it renders a row with as many cells as headingSample items', () => {
      expect(screen.getByRole('row')).toBeTruthy();
      expect(screen.getAllByRole('cell').length).toEqual(columnCount);
    });
    test('THEN the parity props is passed as classname to the row', () => {
      expect(screen.getByRole('row').getAttribute('data-oddrow')).toBeTruthy();
    });
    test('THEN the row has not the class "clickable"', () => {
      expect(
        screen.getByRole('row').classList.contains('clickable')
      ).toBeFalsy();
    });
    test('THEN the data position corresponds to the column header', () => {
      screen.getAllByRole('cell').forEach((cell, i) => {
        expect(cell.textContent).toEqual(
          user1[headingsSample[i].key].toString()
        );
      });
    });
    describe('AND WHEN the user click one the non-clickable row', () => {
      test('THEN the setMoreInfoOpenList method is not fired', () => {
        fireEvent.click(screen.getByRole('row'));
        expect(dispatch).not.toHaveBeenCalled();
      });
    });
  });
  describe('WHEN it is called with one columns not being displayed, and the row not opened', () => {
    beforeEach(() => {
      renderWithStore(
        <table>
          <tbody>
            <TableRow item={user1} isOddRow={true} />
          </tbody>
        </table>,
        {
          headings: headingsSample,
          moreInfoOpenList: [],
          displayedColumns: columnCount - 1,
          currentSort: currentSortNameAscending,
          dispatch: dispatch,
        }
      );
    });
    test('THEN only the last cell is not displayed', () => {
      const lastColumnsCell = screen.getAllByRole('cell').slice(-1);
      const otherColumnsCell = screen.getAllByRole('cell').slice(0, -1);
      expect(lastColumnsCell[0]).toHaveStyleRule('clip', 'rect(0 0 0 0)');
      otherColumnsCell.every((cell) =>
        expect(cell).not.toHaveStyleRule('clip', 'rect(0 0 0 0)')
      );
    });
    test('THEN the additionnal info row is not displayed', () => {
      expect(
        screen
          .getAllByRole('row', { hidden: true })
          .some((row) => row.getAttribute('data-hidden'))
      ).toBeTruthy();
    });
    test('THEN the row is clickable', () => {
      expect(
        screen.getByRole('row').getAttribute('data-clickable')
      ).toBeTruthy();
    });
    describe('AND WHEN the user click one the clickable row', () => {
      test('THEN the setMoreInfoOpenList method is fired', () => {
        fireEvent.click(screen.getByRole('row'));
        expect(dispatch).toHaveBeenCalledWith({
          type: 'setMoreInfoOpenList',
          payload: JSON.stringify(user1),
        });
      });
    });
  });
  describe('WHEN it is called with one columns not being displayed, and the row is opened', () => {
    beforeEach(() => {
      renderWithStore(
        <table>
          <tbody>
            <TableRow item={user1} isOddRow={true} />
          </tbody>
        </table>,
        {
          headings: headingsSample,
          moreInfoOpenList: [JSON.stringify(user1)],
          displayedColumns: columnCount - 1,
          currentSort: currentSortNameAscending,
          dispatch: dispatch,
        }
      );
    });
    test('THEN the additionnal info row is displayed', () => {
      expect(
        screen
          .getAllByRole('row', { hidden: true })
          .some((row) => row.classList.contains('trMoreInfoHidden'))
      ).toBeFalsy();
    });
    test('THEN the additionnal info row contains info only on undisplayed columns', () => {
      const allTh = screen.queryAllByRole('columnheader');
      const additionnalInfoTh = screen
        .getAllByRole('columnheader', { hidden: true })
        .filter((columnHeader) => !allTh.includes(columnHeader));
      const allTd = screen.getAllByRole('cell');
      const additionnalInfoTd = screen
        .getAllByRole('cell', { hidden: true })
        .filter((cell) => !allTd.includes(cell));
      expect(additionnalInfoTh.length).toEqual(1);
      expect(additionnalInfoTd.length).toEqual(2); // container is a hidden td
      expect(additionnalInfoTh[0].textContent).toEqual(
        headingsSample[columnCount - 1].label
      );
      expect(additionnalInfoTd[1].textContent).toEqual(
        user1[headingsSample[columnCount - 1].key]
      );
    });
  });
  describe('WHEN DisplayedData contains more keys than headings', () => {
    test('THEN it renders a row without the additionnal data', () => {
      const user1WithMoreKey = { ...user1, nationnality: 'American' };
      renderWithStore(
        <table>
          <tbody>
            <TableRow item={user1WithMoreKey} isOddRow={true} />
          </tbody>
        </table>,
        {
          headings: headingsSample,
          moreInfoOpenList: [],
          displayedColumns: columnCount,
          currentSort: currentSortNameAscending,
          dispatch: dispatch,
        }
      );
      expect(screen.queryByText('American')).toBeFalsy();
    });
  });
  describe('WHEN DisplayedData contains less keys than headings', () => {
    test('THEN it renders a row with empty cell for missing key', () => {
      const { job, ...userWithoutJob } = user1;
      renderWithStore(
        <table>
          <tbody>
            <TableRow item={userWithoutJob} isOddRow={true} />
          </tbody>
        </table>,
        {
          headings: headingsSample,
          moreInfoOpenList: [],
          displayedColumns: columnCount,
          currentSort: currentSortNameAscending,
          dispatch: dispatch,
        }
      );
      const dataCells = screen.getAllByRole('cell');
      expect(dataCells.length).toEqual(columnCount);
      expect(dataCells[2].textContent).toEqual('');
      expect(screen.queryByText('Engineer')).toBeFalsy();
    });
  });
});
