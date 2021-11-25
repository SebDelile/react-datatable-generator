import { screen } from '@testing-library/react';
import { dataSample } from '../../mocks/dataSample';
import { headingsSample } from '../../mocks/headingsSample';
import { renderWithStore } from '../../utils/test/renderWithStore';
import { Wrapper } from './Wrapper';
jest.mock(
  '../../utils/processing/columnsMinWidthCalc/columnsMinWidthCalc.js',
  () => ({
    __esModule: true,
    columnsMinWidthCalc: (headings) => Array(headings.length).fill(10),
  })
);

const dispatch = jest.fn();
const Children = () => <button>test</button>;
const setWindowSize = (size) => {
  Object.defineProperties(window.HTMLElement.prototype, {
    offsetWidth: {
      get: () => size,
    },
  });
};

describe('GIVEN the Wrapper component', () => {
  describe('WHEN it is called ', () => {
    beforeEach(() => {
      renderWithStore(<Wrapper children={<Children />} className={'class'} />, {
        headings: headingsSample,
        data: dataSample,
        cellInterTextLength: 32,
        width: 100,
        dispatch: dispatch,
      });
    });
    test('THEN it renders an article with classname passed as props', () => {
      const article = screen.getByRole('article');
      expect(article).toBeTruthy();
      expect(article.classList.contains('class')).toBeTruthy();
    });
    test('THEN it renders children', () => {
      expect(screen.getByRole('button', { name: 'test' })).toBeTruthy();
    });
    test('THEN it update width and displayed columns with its current size', () => {
      expect(dispatch).toHaveBeenCalledWith({ type: 'setWidth', payload: 0 });
      expect(dispatch).toHaveBeenCalledWith({
        type: 'setDisplayedColumns',
        payload: 0,
      });
    });
    test('THEN it update the minimum size of each column', () => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'setColumnsMinWidth',
        payload: Array(headingsSample.length).fill(10),
      });
    });
  });
  describe('WHEN it is called and the width being 0', () => {
    test('THEN it do not render the children', () => {
      renderWithStore(<Wrapper children={<Children />} />, {
        headings: headingsSample,
        data: dataSample,
        cellInterTextLength: 32,
        width: 0,
        dispatch: dispatch,
      });
      expect(screen.queryByRole('button', { name: 'test' })).toBeFalsy();
    });
  });
  describe('WHEN it is called and a window resize event occurs', () => {
    test('THEN it update width anew', () => {
      renderWithStore(<Wrapper children={<Children />} />, {
        headings: headingsSample,
        data: dataSample,
        cellInterTextLength: 32,
        width: 100,
        dispatch: dispatch,
      });
      dispatch.mockClear();
      setWindowSize(500);
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
      const { unmount } = renderWithStore(<Wrapper children={<Children />} />, {
        headings: headingsSample,
        data: dataSample,
        cellInterTextLength: 32,
        width: 100,
        dispatch: dispatch,
      });
      dispatch.mockClear();
      unmount();
      setWindowSize(500);
      global.dispatchEvent(new Event('resize'));
      expect(dispatch).not.toHaveBeenCalled();
    });
  });
});
