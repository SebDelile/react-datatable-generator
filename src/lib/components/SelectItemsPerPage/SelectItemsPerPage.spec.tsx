import { screen, fireEvent } from '@testing-library/react';
import { renderWithStore } from '../../utils/test/renderWithStore';
import { SelectItemsPerPage } from './SelectItemsPerPage';

const dispatch = jest.fn();
const itemsPerPageOption = [10, 25, 50, 100];

describe('GIVEN the SelectItemsPerPage component', () => {
  describe('WHEN it is called with options props', () => {
    beforeEach(() =>
      renderWithStore(<SelectItemsPerPage />, {
        itemsPerPage: 25,
        dispatch: dispatch,
        itemsPerPageOption: itemsPerPageOption,
      })
    );
    test('THEN it renders an input select field with a label', () => {
      expect(screen.getByText(/Show/i && /Entries/i)).toBeTruthy();
    });
    test('THEN it renders an input select field with specified options', () => {
      expect(screen.getByRole('combobox')).toBeTruthy();
      const options = screen.getAllByRole('option') as HTMLOptionElement[];
      expect(options.map((option) => parseInt(option.value))).toEqual(
        itemsPerPageOption
      );
    });
    test('THEN the selected value is selected the specified value', () => {
      const options = screen.getAllByRole('option') as HTMLOptionElement[];
      expect(parseInt(options.find((option) => option.selected).value)).toEqual(
        25
      );
      expect(screen.getByText(25)).toBeTruthy();
    });
    describe('AND WHEN the user select a value', () => {
      test('THEN the value is selected and it calls the state updating fonction that was passed as a props', () => {
        fireEvent.change(screen.getByRole('combobox'), {
          target: { value: '50' },
        });
        expect(dispatch).toHaveBeenLastCalledWith({
          type: 'setItemsPerPage',
          payload: 50,
        });
      });
    });
  });
});
