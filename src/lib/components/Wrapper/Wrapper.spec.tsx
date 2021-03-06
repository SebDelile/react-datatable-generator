import { screen } from '@testing-library/react';
import { dataSample } from '../../mocks/dataSample';
import { headingsSample } from '../../mocks/headingsSample';
import { renderWithStore } from '../../utils/test/renderWithStore';
import { HeadingsElementInterface } from '../../utils/types/types';
import { Wrapper } from './Wrapper';
jest.mock(
  '../../utils/processing/columnsMinWidthCalc/columnsMinWidthCalc',
  () => ({
    __esModule: true,
    columnsMinWidthCalc: (headings: HeadingsElementInterface[]) =>
      Array(headings.length).fill(10),
  })
);

const dispatch = jest.fn();
const Children = (): React.ReactElement => <p>child</p>;
const setWindowSize = (size: number): void => {
  Object.defineProperty(window, 'getComputedStyle', {
    value: () => ({
      width: size + 'px',
      borderLeftWidth: '0px',
      borderRightWidth: '0px',
    }),
  });
};

//(prop === 'width' ? size + 'px' : '0px')
describe('GIVEN the Wrapper component', () => {
  describe('WHEN it is called ', () => {
    beforeEach(() => {
      setWindowSize(0);
      renderWithStore(
        <Wrapper className={'class'}>
          <Children />
        </Wrapper>,
        {
          headings: headingsSample,
          data: dataSample,
          width: 100,
          dispatch: dispatch,
        }
      );
    });
    test('THEN it renders an article with classname passed as props', () => {
      const figure = screen.getByRole('figure');
      expect(figure).toBeTruthy();
      expect(figure.classList.contains('class')).toBeTruthy();
    });
    test('THEN it renders children', () => {
      expect(screen.getByText('child')).toBeTruthy();
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
      renderWithStore(
        <Wrapper>
          <Children />
        </Wrapper>,
        {
          headings: headingsSample,
          data: dataSample,
          width: 0,
          dispatch: dispatch,
        }
      );
      expect(screen.queryByRole('button', { name: 'test' })).toBeFalsy();
    });
  });
  describe('WHEN it is called and a window resize event occurs', () => {
    test('THEN it update width anew', () => {
      renderWithStore(
        <Wrapper>
          <Children />
        </Wrapper>,
        {
          headings: headingsSample,
          data: dataSample,
          width: 100,
          dispatch: dispatch,
        }
      );
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
      const { unmount } = renderWithStore(
        <Wrapper>
          <Children />
        </Wrapper>,
        {
          headings: headingsSample,
          data: dataSample,
          width: 100,
          dispatch: dispatch,
        }
      );
      dispatch.mockClear();
      unmount();
      setWindowSize(500);
      global.dispatchEvent(new Event('resize'));
      expect(dispatch).not.toHaveBeenCalled();
    });
  });
});
