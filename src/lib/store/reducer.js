export const reducer = (state, action) => {
  switch (action.type) {
    case 'setFilterKeyword':
      return { ...state, filterKeyword: action.payload };
    case 'setCurrentSort':
      return { ...state, currentSort: action.payload };
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
      return { ...state, currentPage: action.payload };
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
    default:
      console.log(action.type + ' is not recognized');
      return state;
  }
};

// let newDisplayedColumns = undefined;
//       if (!state.isScrollable) {
//         let i = 1;
//         let widthSum = state.columnsMinWidth[0];
//         while (i < state.headings.length) {
//           widthSum += state.columnsMinWidth[i];
//           if (widthSum >= action.payload) break;
//           else i++;
//         }
//         newDisplayedColumns = i;
//       }
//       return {
//         ...state,
//         width: action.payload,
//         displayedColumns: newDisplayedColumns ?? state.displayedColumns,
//       };
