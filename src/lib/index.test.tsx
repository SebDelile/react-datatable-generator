import { render, screen } from '@testing-library/react';
import Datatable from './index';
import { extendedHeadingsSample } from './mocks/extendedHeadingsSample';
import { extendedDataSample } from './mocks/extendedDataSample';
import { HeadingsElementInterface } from './utils/types/types';

jest.mock('./utils/processing/columnsMinWidthCalc/columnsMinWidthCalc', () => ({
  __esModule: true,
  columnsMinWidthCalc: (headings: HeadingsElementInterface[]) =>
    Array(headings.length).fill(10),
}));

describe('GIVEN the Datatable pluggin', () => {
  describe('WHEN it is called with valid headings and data props', () => {
    beforeEach(() => {
      Object.defineProperties(window.HTMLElement.prototype, {
        offsetWidth: {
          get: () => 500,
        },
      });
      render(
        <Datatable
          headings={extendedHeadingsSample}
          data={extendedDataSample}
        />
      );
    });
    test('THEN it renders a figure tag wrapper', () => {
      expect(screen.getByRole('figure')).toBeTruthy();
    });
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
  // describe('WHEN it is called with invalid headings or data props', () => {
  //   test('THEN it renders nothing', () => {
  //     render(<Datatable data={extendedDataSample} width={100} />);
  //     expect(screen.queryByText(/./)).toBeFalsy();
  //   });
  //   test('THEN it renders nothing', () => {
  //     render(
  //       <Datatable headings={{ key: 'value' }} data={extendedDataSample} />
  //     );
  //     expect(screen.queryByText(/./)).toBeFalsy();
  //   });
  //   test('THEN it renders nothing', () => {
  //     render(<Datatable headings={[]} data={extendedDataSample} />);
  //     expect(screen.queryByText(/./)).toBeFalsy();
  //   });
  //   test('THEN it renders nothing', () => {
  //     render(
  //       <Datatable headings={[{ key: 'value' }]} data={extendedDataSample} />
  //     );
  //     expect(screen.queryByText(/./)).toBeFalsy();
  //   });
  //   test('THEN it renders nothing', () => {
  //     render(
  //       <Datatable headings={[{ label: 'value' }]} data={extendedDataSample} />
  //     );
  //     expect(screen.queryByText(/./)).toBeFalsy();
  //   });
  //   test('THEN it renders nothing', () => {
  //     render(
  //       <Datatable
  //         headings={[
  //           { key: 'same value', label: 'label' },
  //           { key: 'same value', label: 'otherlabel' },
  //         ]}
  //         data={extendedDataSample}
  //       />
  //     );
  //     expect(screen.queryByText(/./)).toBeFalsy();
  //   });
  // });
});
