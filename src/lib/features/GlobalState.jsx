import { createContext, useState, useEffect } from 'react';
import { filterHandler } from '../handlers/filterHandler/filterHandler.js';
import { sortHandler } from '../handlers/sortHandler/sortHandler.js';
import { pagingHandler } from '../handlers/pagingHandler/pagingHandler.js';

export const GlobalState = createContext();

export const GlobalStateProvider = ({
  children,
  headings,
  data,
  itemsPerPageOption,
  isScrollable,
}) => {
  const [filterKeyword, setFilterKeyword] = useState('');
  const [currentSort, setCurrentSort] = useState({
    key: headings[0].key ?? null,
    direction: 1,
    type: headings[0].type ?? undefined,
  });
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOption[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moreInfoOpenList, setMoreInfoOpenList] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [sortedData, setSortedData] = useState(filteredData);
  const [displayedData, setDisplayedData] = useState(sortedData);

  useEffect(() => {
    setFilteredData(filterHandler(data, filterKeyword));
  }, [data, filterKeyword]);

  useEffect(() => {
    setSortedData(sortHandler(filteredData, currentSort));
    setCurrentPage(1);
  }, [filteredData, currentSort]);

  useEffect(() => {
    setDisplayedData(pagingHandler(sortedData, currentPage, itemsPerPage));
  }, [sortedData, currentPage, itemsPerPage]);

  const updateItemsPerPage = (newItemsPerPage) => {
    const currentFirstItemIndex = (currentPage - 1) * itemsPerPage;
    const newCurrentPage =
      Math.floor(currentFirstItemIndex / newItemsPerPage) + 1;
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(newCurrentPage);
  };

  const updateMoreInfoOpenList = (stringifiedItem) => {
    const index = moreInfoOpenList.indexOf(stringifiedItem);
    const newList = [...moreInfoOpenList];
    if (index === -1) newList.push(stringifiedItem);
    else newList.splice(index, 1);
    setMoreInfoOpenList(newList);
  };

  return (
    <GlobalState.Provider
      value={{
        headings,
        data,
        itemsPerPageOption,
        isScrollable,
        filterKeyword,
        setFilterKeyword,
        currentSort,
        setCurrentSort,
        itemsPerPage,
        updateItemsPerPage,
        currentPage,
        setCurrentPage,
        moreInfoOpenList,
        updateMoreInfoOpenList,
        filteredData,
        setFilteredData,
        sortedData,
        setSortedData,
        displayedData,
        setDisplayedData,
      }}
    >
      {children}
    </GlobalState.Provider>
  );
};
