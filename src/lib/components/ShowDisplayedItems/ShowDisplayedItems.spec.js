import { render, screen } from '@testing-library/react';
import { ShowDisplayedItems } from './ShowDisplayedItems';

describe('GIVEN the ShowDisplayedItems component', () => {
  describe('WHEN it is called with missing props between page, entries or displayedDataLength', () => {
    test('THEN it renders nothing', () => {
      render(<ShowDisplayedItems />);
      expect(screen.queryByText(/./i)).toBeFalsy();
    });
    test('THEN it renders nothing', () => {
      render(<ShowDisplayedItems page={3} itemsPerPage={10} />);
      expect(screen.queryByText(/./i)).toBeFalsy();
    });
    test('THEN it renders nothing', () => {
      render(<ShowDisplayedItems page={3} displayedDataLength={48} />);
      expect(screen.queryByText(/./i)).toBeFalsy();
    });
    test('THEN it renders nothing', () => {
      render(<ShowDisplayedItems itemsPerPage={10} displayedDataLength={48} />);
      expect(screen.queryByText(/./i)).toBeFalsy();
    });
  });
  describe('WHEN it is called with props and the items to display is equal than the items per page', () => {
    test('THEN it renders a sentence with a range between 1s item of the page and last item of the page', () => {
      render(
        <ShowDisplayedItems
          page={3}
          itemsPerPage={10}
          displayedDataLength={48}
        />
      );
      expect(screen.getByText(/21 to 30 of 48/i)).toBeTruthy();
    });
  });
  describe('WHEN it is called with props and the items to display is less than the items per page', () => {
    test('THEN it renders a sentence with a range between 1s item of the page and last item of the page', () => {
      render(
        <ShowDisplayedItems
          page={5}
          itemsPerPage={10}
          displayedDataLength={48}
        />
      );
      expect(screen.getByText(/41 to 48 of 48/i)).toBeTruthy();
    });
  });
  describe('WHEN it is called with additionnal props unfiltredDataLength equal to dataLength', () => {
    test('THEN it renders a sentence with a range between 1s item of the page and last item of the page', () => {
      render(
        <ShowDisplayedItems
          page={5}
          itemsPerPage={10}
          displayedDataLength={48}
          unfiltredDataLength={48}
        />
      );
      expect(screen.getByText(/41 to 48 of 48/i)).toBeTruthy();
      expect(screen.queryByText(/total/i)).toBeFalsy();
    });
  });
  describe('WHEN it is called with additionnal props unfiltredDataLength', () => {
    test('THEN it additionnaly displays the number of unflitred data', () => {
      render(
        <ShowDisplayedItems
          page={5}
          itemsPerPage={10}
          displayedDataLength={48}
          unfiltredDataLength={64}
        />
      );
      expect(screen.getByText(/41 to 48 of 48/i && /64 total/i)).toBeTruthy();
    });
  });
});
