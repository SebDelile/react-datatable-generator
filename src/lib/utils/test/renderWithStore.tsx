import { render } from '@testing-library/react';
import { store } from '../../store/store';
import { defaultStyle } from '../style/defaultStyle';
import { ContextType } from '../../utils/types/types';

/**
 * Gives a provider fortesting of each needing the access to the store
 * @param {React.ReactElement} ui - the component to test
 * @param {object} contextValues - the values of the states used by the component and needed for test
 * @param {object} renderOptions - option oject to pass to the render method
 * @memberof utils
 * @function
 * @returns {ReactElement} - the result of the render method with the ui being wrapped by the provider
 */
export const renderWithStore = (
  ui: React.ReactElement,
  contextValues: Partial<ContextType>,
  renderOptions?: { [Key: string]: any }
) => {
  const StoreProvider = ({ children }) => (
    <store.Provider value={{ ...defaultContext, ...contextValues }}>
      {children}
    </store.Provider>
  );
  return render(<StoreProvider>{ui}</StoreProvider>, renderOptions);
};

const defaultContext: ContextType = {
  headings: [],
  data: [],
  itemsPerPageOption: [10, 25, 50, 100],
  isScrollable: false,
  filterKeyword: '',
  currentSort: {
    key: null,
    direction: 1,
    type: undefined,
  },
  itemsPerPage: 10,
  currentPage: 1,
  moreInfoOpenList: [],
  filteredData: [],
  sortedData: [],
  displayedData: [],
  width: 1000,
  columnsMinWidth: [],
  displayedColumns: 0,
  style: defaultStyle,
  dispatch: () => null,
};
