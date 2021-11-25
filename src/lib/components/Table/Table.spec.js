import { screen } from '@testing-library/react';
import { renderWithStore } from '../../utils/test/renderWithStore';
import { Table } from './Table';

describe('GIVEN the Table component', () => {
  describe('WHEN it is called with width being less than sum of displays columns and being scrollable', () => {
    test('THEN it renders as a block', () => {
      renderWithStore(<Table />, {
        isScrollable: true,
        width: 100,
        columnsMinWidth: [100, 100],
      });
      expect(
        screen.getByRole('table').classList.contains('tableBlock')
      ).toBeTruthy();
    });
  });
  describe('WHEN it is called with width being more than sum of displays columns or being not scrollable', () => {
    test('THEN it renders as a table', () => {
      renderWithStore(<Table />, {
        isScrollable: true,
        width: 500,
        columnsMinWidth: [100, 100],
      });
      expect(
        screen.getByRole('table').classList.contains('tableBlock')
      ).toBeFalsy();
    });
    test('THEN it renders as a table', () => {
      renderWithStore(<Table />, {
        isScrollable: false,
        width: 100,
        columnsMinWidth: [100, 100],
      });
      expect(
        screen.getByRole('table').classList.contains('tableBlock')
      ).toBeFalsy();
    });
  });
});
