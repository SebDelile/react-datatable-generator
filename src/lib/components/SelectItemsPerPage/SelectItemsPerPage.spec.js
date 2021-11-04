import { render, screen, fireEvent } from '@testing-library/react';
import { SelectItemsPerPage } from './SelectItemsPerPage.jsx';

const mockedSetItemsPerPage = jest.fn();

describe('GIVEN the SelectItemsPerPage component', () => {
  describe('WHEN it is called with no props', () => {
    beforeEach(() => render(<SelectItemsPerPage />));
    test('THEN it renders an input select field with a label', () => {
      expect(screen.getByText(/Show/i && /Entries/i)).toBeTruthy();
    });
    test('THEN it renders an input select field with the 4 default options', () => {
      expect(screen.getByRole('combobox')).toBeTruthy();
      expect(
        screen.getAllByRole('option').map((option) => option.value)
      ).toEqual(['10', '25', '50', '100']);
    });
    test('THEN the 1st value of options array is selected as default', () => {
      expect(
        screen.getAllByRole('option').find((option) => option.selected).value
      ).toEqual('10');
      expect(screen.getByText('10')).toBeTruthy();
    });
  });
  describe('WHEN it is called with a itemsPerPage and setItemsPerPage props', () => {
    beforeEach(() =>
      render(
        <SelectItemsPerPage
          itemsPerPage={50}
          setItemsPerPage={mockedSetItemsPerPage}
        />
      )
    );
    test('THEN this option is selected', () => {
      expect(
        screen.getAllByRole('option').find((option) => option.selected).value
      ).toEqual('50');
      expect(screen.getByText('50')).toBeTruthy();
    });
    describe('AND WHEN the user select a value', () => {
      test('THEN the value is selected and it calls the state updating fonction that was passed as a props', () => {
        fireEvent.change(screen.getByRole('combobox'), {
          target: { value: '25' },
        });
        expect(mockedSetItemsPerPage).toHaveBeenLastCalledWith(25);
      });
    });
  });
  describe('WHEN it is called with a itemsPerPage and setItemsPerPage props', () => {
    test('THEN this option is selected', () => {
      render(
        <SelectItemsPerPage
          itemsPerPage={50}
          setItemsPerPage={mockedSetItemsPerPage}
          options={[12, 24, 36]}
        />
      );
      expect(
        screen.getAllByRole('option').map((option) => option.value)
      ).toEqual(['12', '24', '36']);
    });
  });
});
