import { createContext, useEffect, useReducer } from 'react';
import { reducer } from './reducer';
import { filterHandler } from '../handlers/filterHandler/filterHandler';
import { sortHandler } from '../handlers/sortHandler/sortHandler';
import { pagingHandler } from '../handlers/pagingHandler/pagingHandler';

/**
 * The store containing all state of the pluggin.
 * It uses the react context API to spread the state on all component needing it.
 * it uses the reducer API to manage state update, by taking old state + action object to return new state.
 * Returns unmodified data if there is less items than itemsPerPage value.
 * @memberof store
 */
export const store = createContext();

/**
 * the context provider of the store context.
 * Provides the spreaded state and the dispatch function form the store.
 * It has 3 useEffect to update the data on filtering, sorting or paginating (in this order).
 * Filtering trigger sorting update, sorting trigger paginating update. so updating paginating do not trigger calculation on filterring and sorting data (because no need).
 * @memberof store
 * @param {object} props - the props passed to the pluggin on initialization are forwarded to store provider to be included in initialState.
 * @returns {ReactElement} the provider component to wrap all component that need access to the state.
 */
export const StoreProvider = ({
  children,
  headings,
  data,
  itemsPerPageOption,
  isScrollable,
  style,
}) => {
  /**
   * the initial state of the store context.
   * It uses the props passed at initialization of the plugin.
   * @memberof store
   */
  const initialState = {
    headings: headings,
    data: data,
    itemsPerPageOption: itemsPerPageOption,
    isScrollable: isScrollable,
    filterKeyword: '',
    currentSort: {
      key: headings[0].key ?? null,
      direction: 1,
      type: headings[0].type ?? undefined,
    },
    itemsPerPage: itemsPerPageOption[0],
    currentPage: 1,
    moreInfoOpenList: [],
    filteredData: data,
    sortedData: data,
    displayedData: data,
    width: 0,
    columnsMinWidth: [],
    displayedColumns: headings.length,
    style: style,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({
      type: 'setFilteredData',
      payload: filterHandler(state.data, state.filterKeyword),
    });
  }, [state.data, state.filterKeyword]);

  useEffect(() => {
    dispatch({
      type: 'setSortedData',
      payload: sortHandler(state.filteredData, state.currentSort),
    });
  }, [state.filteredData, state.currentSort]);

  useEffect(() => {
    dispatch({
      type: 'setDisplayedData',
      payload: pagingHandler(
        state.sortedData,
        state.currentPage,
        state.itemsPerPage
      ),
    });
  }, [state.sortedData, state.currentPage, state.itemsPerPage]);

  return (
    <store.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </store.Provider>
  );
};
