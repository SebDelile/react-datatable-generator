import { render, screen } from '@testing-library/react';
import Datatable from './index.jsx';
import { extendedHeadingsSample } from './mocks/extendedHeadingsSample.js';
import { extendedDataSample } from './mocks/extendedDataSample.js';

describe('GIVEN the Datatable pluggin', () => {
  describe('WHEN it is called with headings and data props', () => {
    beforeEach(() =>
      render(
        <Datatable
          headings={extendedHeadingsSample}
          data={extendedDataSample}
        />
      )
    );
    test('THEN it renders all the elements including a combobox to select the number of items per page', () => {
      expect(screen.getByRole('combobox')).toBeTruthy();
      expect(
        screen.getAllByRole('option').map((option) => option.value)
      ).toEqual(['10', '25', '50', '100']);
    });
    test('THEN it renders all the elements including a textbox to input filter keywords', () => {
      expect(screen.getByRole('textbox')).toBeTruthy();
      expect(screen.getByText(/Search/)).toBeTruthy();
    });
    test('THEN it renders all the elements including a table header row', () => {
      expect(screen.getAllByRole('columnheader')).toBeTruthy();
    });
    test('THEN it renders all the elements including a table body', () => {
      expect(screen.getAllByRole('row')).toBeTruthy();
    });
    test('THEN it renders all the elements including an indication on indexes of the displayed elements', () => {
      expect(screen.getByText(/1 to 10 of 12/i)).toBeTruthy();
    });
    test('THEN it renders all the elements including a page selector set of buttons', () => {
      expect(screen.getByRole('button', { name: 'Previous' })).toBeTruthy();
      expect(screen.getByRole('button', { name: '1' })).toBeTruthy();
      expect(screen.getByRole('button', { name: '2' })).toBeTruthy();
      expect(screen.getByRole('button', { name: 'Next' })).toBeTruthy();
    });
  });
});
