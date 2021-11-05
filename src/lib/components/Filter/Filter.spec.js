import { render, screen, fireEvent } from '@testing-library/react';
import { Filter } from './Filter.jsx';

const mockedSetFilterKeyword = jest.fn();

describe('GIVEN the Filter component', () => {
  describe('WHEN it is called with empty filterkeyword props', () => {
    beforeEach(() =>
      render(
        <Filter filterKeyword="" setFilterKeyword={mockedSetFilterKeyword} />
      )
    );
    test('THEN it renders an input text field with a label', () => {
      expect(screen.getByRole('textbox')).toBeTruthy();
      expect(screen.getByText(/Search/)).toBeTruthy();
    });
    test('THEN there is no displayed reset button', () => {
      expect(screen.queryByRole('button')).toBeFalsy();
    });
    describe('AND WHEN the user input a value', () => {
      test('THEN it calls the state updating fonction that was passed as a props with inputed value', () => {
        fireEvent.change(screen.getByRole('textbox'), {
          target: { value: 'keyword' },
        });
        expect(mockedSetFilterKeyword).toHaveBeenCalledWith('keyword');
      });
    });
  });
  describe('WHEN it is called with a non-empty filterkeyword props', () => {
    beforeEach(() =>
      render(
        <Filter
          filterKeyword="keyword"
          setFilterKeyword={mockedSetFilterKeyword}
        />
      )
    );
    test('THEN it renders the input text value is equal to the filterkeyword props', () => {
      expect(screen.getByRole('textbox').value).toEqual('keyword');
    });
    test('THEN there is a displayed reset button', () => {
      expect(screen.getByRole('button')).toBeTruthy();
    });
    describe('AND WHEN the reset button is clicked', () => {
      test('THEN it calls the state updating fonction that was passed as a props with inputed value', () => {
        fireEvent.click(screen.getByRole('button'));
        expect(mockedSetFilterKeyword).toHaveBeenCalledWith('');
      });
    });
  });
});
