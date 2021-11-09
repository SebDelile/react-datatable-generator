import { useEffect, useState } from 'react';
import { SelectItemsPerPage } from './components/SelectItemsPerPage/SelectItemsPerPage.jsx';
import { Filter } from './components/Filter/Filter.jsx';
import { TableHeading } from './components/TableHeading/TableHeading.jsx';
import { TableBody } from './components/TableBody/TableBody.jsx';
import { ShowDisplayedItems } from './components/ShowDisplayedItems/ShowDisplayedItems.jsx';
import { SelectPage } from './components/SelectPage/SelectPage.jsx';
import { filterHandler } from './handlers/filterHandler/filterHandler.js';
import { sortHandler } from './handlers/sortHandler/sortHandler.js';
import { pagingHandler } from './handlers/pagingHandler/pagingHandler.js';
import styles from './index.module.css';

const Datatable = ({
  headings,
  data,
  itemsPerPageOption = [10, 25, 50, 100],
}) => {
  const [filterKeyword, setFilterKeyword] = useState('');
  const [currentSort, setCurrentSort] = useState({
    key: headings[0].key ?? null,
    direction: 1,
    type: headings[0].type ?? undefined,
  });
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOption[0]);
  const [currentPage, setCurrentPage] = useState(1);

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

  return (
    <article className={styles.datatable}>
      <SelectItemsPerPage
        itemsPerPage={itemsPerPage}
        updateItemsPerPage={updateItemsPerPage}
        options={itemsPerPageOption}
        className={styles.selectItemsPerPage}
      />
      <Filter
        filterKeyword={filterKeyword}
        setFilterKeyword={setFilterKeyword}
        className={styles.filter}
      />
      <table className={styles.table}>
        <TableHeading
          headings={headings}
          currentSort={currentSort}
          setCurrentSort={setCurrentSort}
        />
        <TableBody
          headings={headings}
          data={displayedData}
          currentSortKey={currentSort.key}
        />
      </table>
      <ShowDisplayedItems
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        displayedDataLength={filteredData.length}
        unfiltredDataLength={data.length}
      />
      <SelectPage
        currentPage={currentPage}
        numberOfPages={Math.ceil(filteredData.length / itemsPerPage)}
        setCurrentPage={setCurrentPage}
      />
    </article>
  );
};
export default Datatable;
