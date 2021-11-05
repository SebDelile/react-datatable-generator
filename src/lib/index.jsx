import { useEffect, useState } from 'react';
import { SelectItemsPerPage } from './components/SelectItemsPerPage/SelectItemsPerPage.jsx';
import { Filter } from './components/Filter/Filter.jsx';
import { TableHeading } from './components/TableHeading/TableHeading.jsx';
import { TableBody } from './components/TableBody/TableBody.jsx';
import { ShowDisplayedItems } from './components/ShowDisplayedItems/ShowDisplayedItems.jsx';
import { filterHandler } from './handlers/filterHandler/filterHandler.js';
import { sortHandler } from './handlers/sortHandler/sortHandler.js';

const Datatable = ({
  headings,
  data,
  itemsPerPageOption = [10, 25, 50, 100],
}) => {
  const [filterKeyword, setFilterKeyword] = useState('');
  const [currentSort, setCurrentSort] = useState({
    key: null,
    direction: 1,
    type: 'string',
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
  }, [filteredData, currentSort]);

  useEffect(() => {
    setDisplayedData(sortedData);
  }, [sortedData, currentSort]);

  return (
    <article>
      <SelectItemsPerPage
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        options={itemsPerPageOption}
      />
      <Filter
        filterKeyword={filterKeyword}
        setFilterKeyword={setFilterKeyword}
      />
      <table>
        <TableHeading
          headings={headings}
          currentSort={currentSort}
          setCurrentSort={setCurrentSort}
        />
        <TableBody headings={headings} data={displayedData} />
      </table>
      <ShowDisplayedItems
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        displayedDataLength={displayedData.length}
        unfiltredDataLength={data.length}
      />
    </article>
  );
};
export default Datatable;
