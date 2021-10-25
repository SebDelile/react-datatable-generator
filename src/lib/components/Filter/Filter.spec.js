import { render, screen, fireEvent } from '@testing-library/react';
import { Filter } from './Filter.jsx';

describe('GIVEN the Filter component', () => {
  describe('WHEN it is called', () => {
    test('THEN it renders an input text field with a label', () => {
      render(<Filter />);
      expect(screen.getByRole('textbox')).toBeTruthy();
      expect(screen.getByText(/Search/)).toBeTruthy();
    });
  });
  describe('WHEN the user input a value', () => {
    test('THEN it calls the state updating fonction that was passed as a props', () => {
      const mockedSetFilterKeyword = jest.fn();
      render(<Filter setFilterKeyword={mockedSetFilterKeyword} />);
      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: 'keyword' },
      });
      expect(mockedSetFilterKeyword).toHaveBeenCalledWith('keyword');
    });
  });
});
