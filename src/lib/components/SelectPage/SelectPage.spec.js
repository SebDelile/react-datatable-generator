import { render, screen, fireEvent } from '@testing-library/react';
import { SelectPage } from './SelectPage.jsx';

const mockedSetCurrentPage = jest.fn();

describe('GIVEN the SelectPage component', () => {
  describe('WHEN it is called with no props', () => {
    test('THEN it renders nothing', () => {
      render(<SelectPage />);
      expect(screen.queryByText(/./i)).toBeFalsy();
    });
    test('THEN it renders nothing', () => {
      render(<SelectPage currentPage={2} />);
      expect(screen.queryByText(/./i)).toBeFalsy();
    });
    test('THEN it renders nothing', () => {
      render(<SelectPage numberOfPages={5} />);
      expect(screen.queryByText(/./i)).toBeFalsy();
    });
  });
  describe('WHEN it is called with correct page props', () => {
    beforeEach(() => render(<SelectPage currentPage={2} numberOfPages={5} />));
    test('THEN it renders a bunch of buttons : "Previous + one for each page (text=page) + "Next"', () => {
      expect(
        screen.getAllByRole('button').map((button) => button.textContent)
      ).toEqual(['Previous', '1', '2', '3', '4', '5', 'Next']);
    });
    test('THEN the button corresponding to currentPage is disabled', () => {
      expect(screen.getByRole('button', { name: 2 }).disabled).toBeTruthy();
    });
  });
  describe('WHEN it is called with correct page props and currentPage is 1', () => {
    test('THEN previous button is disabled', () => {
      render(<SelectPage currentPage={1} numberOfPages={5} />);
      expect(
        screen.getByRole('button', { name: 'Previous' }).disabled
      ).toBeTruthy();
    });
  });
  describe('WHEN it is called with correct page props and currentPage is equal to numberOfPages', () => {
    test('THEN next button is disabled', () => {
      render(<SelectPage currentPage={5} numberOfPages={5} />);
      expect(
        screen.getByRole('button', { name: 'Next' }).disabled
      ).toBeTruthy();
    });
  });
  describe('WHEN it is called with correct page props and numberOfPages is bigger than 7', () => {
    describe('AND WHEN currentPage is lower or equal to 4', () => {
      test('THEN there are only 9 buttons, buttons 6 to second to last are replaced by a button "..." (disabled)', () => {
        render(<SelectPage currentPage={3} numberOfPages={13} />);
        expect(
          screen.getAllByRole('button').map((button) => button.textContent)
        ).toEqual(['Previous', '1', '2', '3', '4', '5', '...', '13', 'Next']);
        expect(
          screen.getByRole('button', { name: '...' }).disabled
        ).toBeTruthy();
      });
    });
    describe('AND WHEN currentPage is among the last 4', () => {
      test('THEN there are only 9 buttons, buttons 2 to fifth from the end are replaced by a button "..." (disabled)', () => {
        render(<SelectPage currentPage={11} numberOfPages={13} />);
        expect(
          screen.getAllByRole('button').map((button) => button.textContent)
        ).toEqual([
          'Previous',
          '1',
          '...',
          '9',
          '10',
          '11',
          '12',
          '13',
          'Next',
        ]);
        expect(
          screen.getByRole('button', { name: '...' }).disabled
        ).toBeTruthy();
      });
    });
    describe('AND WHEN currentPage is neither among the first 4 nor the last 4', () => {
      test('THEN there are only 9 buttons, buttons 2 to currentPage-2 and from currentPage+2 to numberOfPage-1 are replaced by buttons "..." (disabled)', () => {
        render(<SelectPage currentPage={7} numberOfPages={13} />);
        expect(
          screen.getAllByRole('button').map((button) => button.textContent)
        ).toEqual(['Previous', '1', '...', '6', '7', '8', '...', '13', 'Next']);
        expect(
          screen
            .getAllByRole('button', { name: '...' })
            .every((button) => button.disabled)
        ).toBeTruthy();
      });
    });
  });
  describe('WHEN it is called with correct page props and a setCurrentPage function', () => {
    beforeEach(() =>
      render(
        <SelectPage
          currentPage={2}
          numberOfPages={5}
          setCurrentPage={mockedSetCurrentPage}
        />
      )
    );
    describe('AND WHEN the user click on a button containing a page number', () => {
      test('THEN setCurrentPage function is fired with this page number as parameter', () => {
        fireEvent.click(screen.getByRole('button', { name: '4' }));
        expect(mockedSetCurrentPage).toHaveBeenLastCalledWith(4);
      });
    });
    describe('AND WHEN the user click on a "previous" button', () => {
      test('THEN setCurrentPage function is fired with this currentPage-1 as parameter', () => {
        fireEvent.click(screen.getByRole('button', { name: 'Previous' }));
        expect(mockedSetCurrentPage).toHaveBeenLastCalledWith(1);
      });
    });
    describe('AND WHEN the user click on a "next" button', () => {
      test('THEN setCurrentPage function is fired with this currentPage+1 as parameter', () => {
        fireEvent.click(screen.getByRole('button', { name: 'Next' }));
        expect(mockedSetCurrentPage).toHaveBeenLastCalledWith(3);
      });
    });
  });
});
