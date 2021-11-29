/**
 * The reducer fonction of the store.
 * Returns the spreaded current state and 0 to many properties with new value based on action type.
 * Contain all pure logic for the calculation of the new state. Logic depending on something else than state or action is managed outside of the reducer (often before dispatching).
 * @memberof store
 * @param {object} state - the current state.
 * @param {object} action - the action object with key type and optionnal key payload.
 * @returns {object} - the updated state.
 */
export const reducer = (state, action) => {
  switch (action.type) {
    case 'setFilterKeyword':
      return { ...state, filterKeyword: action.payload };
    case 'setCurrentSort':
      let newSort = undefined;
      if (
        state.currentSort.key === action.payload.key &&
        state.currentSort.direction > 0
      )
        newSort = {
          key: action.payload.key,
          direction: -1,
          type: action.payload.type,
        };
      else
        newSort = {
          key: action.payload.key,
          direction: 1,
          type: action.payload.type,
        };
      return { ...state, currentSort: newSort };
    case 'setItemsPerPage':
      const currentFirstItemOnPageIndex =
        (state.currentPage - 1) * state.itemsPerPage;
      const newCurrentPage =
        Math.floor(currentFirstItemOnPageIndex / action.payload) + 1;
      return {
        ...state,
        itemsPerPage: action.payload,
        currentPage: newCurrentPage,
        headings: state.headings,
      };
    case 'setCurrentPage':
      let newPage = null;
      if (action.payload === 'Previous') newPage = state.currentPage - 1;
      else if (action.payload === 'Next') newPage = state.currentPage + 1;
      else newPage = parseInt(action.payload);
      return { ...state, currentPage: newPage };
    case 'setMoreInfoOpenList':
      const index = state.moreInfoOpenList.indexOf(action.payload);
      const newList = [...state.moreInfoOpenList];
      if (index === -1) newList.push(action.payload);
      else newList.splice(index, 1);
      return { ...state, moreInfoOpenList: newList };
    case 'setFilteredData':
      return { ...state, filteredData: action.payload };
    case 'setSortedData':
      return { ...state, sortedData: action.payload, currentPage: 1 };
    case 'setDisplayedData':
      return { ...state, displayedData: action.payload };
    case 'setWidth':
      return { ...state, width: action.payload };
    case 'setDisplayedColumns':
      if (state.isScrollable) return state;
      else {
        let i = 1;
        let widthSum = state.columnsMinWidth[0];
        while (i < state.headings.length) {
          widthSum += state.columnsMinWidth[i];
          if (widthSum >= action.payload) break;
          else i++;
        }
        return { ...state, displayedColumns: i };
      }
    case 'setColumnsMinWidth':
      if (!action.payload) return state;
      return {
        ...state,
        columnsMinWidth: action.payload,
      };
    default:
      console.log(action.type + ' is not recognized');
      return state;
  }
};
