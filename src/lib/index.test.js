import { render, screen } from '@testing-library/react';
import Datatable from './index.jsx';
import { extendedHeadingsSample } from './mocks/extendedHeadingsSample.js';
import { extendedDataSample } from './mocks/extendedDataSample.js';

jest.mock(
  './utils/processing/columnsMinWidthCalc/columnsMinWidthCalc.js',
  () => ({
    __esModule: true,
    columnsMinWidthCalc: (headings) => Array(headings.length).fill(10),
  })
);

describe('GIVEN the Datatable pluggin', () => {
  describe('WHEN it is called with valid headings and data props', () => {
    beforeEach(() =>
      render(
        <Datatable
          headings={extendedHeadingsSample}
          data={extendedDataSample}
        />
      )
    );
    test('THEN it renders a combobox', () => {
      expect(screen.getByRole('combobox')).toBeTruthy();
    });
    test('THEN it renders a textbox to input filter keywords', () => {
      expect(screen.getByRole('textbox')).toBeTruthy();
      expect(screen.getByText(/Search/)).toBeTruthy();
    });
    test('THEN it renders a table', () => {
      expect(screen.getByRole('table')).toBeTruthy();
    });
    test('THEN it renders all the elements including an indication on indexes of the displayed elements', () => {
      expect(screen.getByText(/showing.+entries/i)).toBeTruthy();
    });
    test('THEN it renders all the elements including a page selector set of buttons', () => {
      expect(screen.getByRole('button', { name: 'Previous' })).toBeTruthy();
      expect(screen.getByRole('button', { name: '1' })).toBeTruthy();
      expect(screen.getByRole('button', { name: 'Next' })).toBeTruthy();
    });
  });
  describe('WHEN it is called with invalid headings or data props', () => {
    test('THEN it renders nothing', () => {
      render(<Datatable data={extendedDataSample} />);
      expect(screen.queryByText(/./)).toBeFalsy();
    });
    test('THEN it renders nothing', () => {
      render(
        <Datatable headings={{ key: 'value' }} data={extendedDataSample} />
      );
      expect(screen.queryByText(/./)).toBeFalsy();
    });
    test('THEN it renders nothing', () => {
      render(<Datatable headings={[]} data={extendedDataSample} />);
      expect(screen.queryByText(/./)).toBeFalsy();
    });
    test('THEN it renders nothing', () => {
      render(
        <Datatable headings={[{ key: 'value' }]} data={extendedDataSample} />
      );
      expect(screen.queryByText(/./)).toBeFalsy();
    });
    test('THEN it renders nothing', () => {
      render(
        <Datatable headings={[{ label: 'value' }]} data={extendedDataSample} />
      );
      expect(screen.queryByText(/./)).toBeFalsy();
    });
    test('THEN it renders nothing', () => {
      render(
        <Datatable
          headings={[
            { key: 'same value', label: 'label' },
            { key: 'same value', label: 'otherlabel' },
          ]}
          data={extendedDataSample}
        />
      );
      expect(screen.queryByText(/./)).toBeFalsy();
    });
  });
});
