import { createContext, useEffect, useReducer } from 'react';
import { reducer } from './reducer';
import { filterHandler } from '../handlers/filterHandler/filterHandler';
import { sortHandler } from '../handlers/sortHandler/sortHandler';
import { pagingHandler } from '../handlers/pagingHandler/pagingHandler';
import { columnsMinWidthCalc } from '../utils/processing/columnsMinWidthCalc/columnsMinWidthCalc';

export const store = createContext();

export const StoreProvider = ({
  children,
  headings,
  data,
  itemsPerPageOption,
  isScrollable,
  cellInterTextLength,
}) => {
  const initialState = {
    headings: headings,
    data: data,
    itemsPerPageOption: itemsPerPageOption,
    isScrollable: isScrollable,
    cellInterTextLength: cellInterTextLength,
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
    columnsMinWidth: columnsMinWidthCalc(headings, data).map(
      (minWidth) => minWidth + cellInterTextLength
    ),
    displayedColumns: headings.length,
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
