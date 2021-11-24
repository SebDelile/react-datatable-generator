import { screen } from '@testing-library/react';
import { renderWithStore } from '../../utils/test/renderWithStore';
import { Table } from './Table';

const dispatch = jest.fn();

describe('GIVEN the Table component', () => {
  describe('WHEN it is called with width being less than sum of displays columns and being scrollable', () => {
    test('THEN it renders as a block', () => {
      renderWithStore(<Table />, {
        isScrollable: true,
        width: 100,
        columnsMinWidth: [100, 100],
        dispatch: dispatch,
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
        dispatch: dispatch,
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
        dispatch: dispatch,
      });
      expect(
        screen.getByRole('table').classList.contains('tableBlock')
      ).toBeFalsy();
    });
  });
  describe('WHEN it is called ', () => {
    test('THEN it update width with its current size', () => {
      renderWithStore(<Table />, {
        isScrollable: true,
        width: 100,
        columnsMinWidth: [100, 100],
        dispatch: dispatch,
      });
      expect(dispatch).toHaveBeenCalledTimes(2);
    });
  });
  describe('WHEN it is called and a window resize event occurs', () => {
    test('THEN it update width anew', () => {
      renderWithStore(<Table />, {
        isScrollable: true,
        width: 100,
        columnsMinWidth: [100, 100],
        dispatch: dispatch,
      });
      expect(dispatch).toHaveBeenCalledTimes(2);
      dispatch.mockClear();
      Object.defineProperties(window.HTMLElement.prototype, {
        offsetWidth: {
          get: () => 500,
        },
      });
      global.dispatchEvent(new Event('resize'));
      expect(dispatch).toHaveBeenCalledWith({ type: 'setWidth', payload: 500 });
      expect(dispatch).toHaveBeenCalledWith({
        type: 'setDisplayedColumns',
        payload: 500,
      });
    });
  });
  describe('WHEN it is called then unmounted and a window resize event occurs', () => {
    test('THEN there is no more fired eventlistener callback', () => {
      const { unmount } = renderWithStore(<Table />, {
        isScrollable: true,
        width: 100,
        columnsMinWidth: [100, 100],
        dispatch: dispatch,
      });
      expect(dispatch).toHaveBeenCalledTimes(2);
      dispatch.mockClear();
      unmount();
      Object.defineProperties(window.HTMLElement.prototype, {
        offsetWidth: {
          get: () => 500,
        },
      });
      global.dispatchEvent(new Event('resize'));
      expect(dispatch).not.toHaveBeenCalled();
    });
  });
});
