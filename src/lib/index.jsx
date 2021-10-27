import { useEffect, useState } from 'react';
import { Filter } from './components/Filter/Filter.jsx';
import { TableHeading } from './components/TableHeading/TableHeading.jsx';
import { TableBody } from './components/TableBody/TableBody.jsx';
import { filterHandler } from './handlers/filterHandler/filterHandler.js';

const Datatable = ({ headings, data }) => {
  const [filterKeyword, setFilterKeyword] = useState('');
  const [currentSort, setCurrentSort] = useState({ key: null, direction: 1 });
  const [dataToDisplay, setDataToDisplay] = useState(data);

  useEffect(() => {
    const filteredData = filterHandler(data, filterKeyword);
    setDataToDisplay(filteredData);
  }, [data, filterKeyword]);

  return (
    <article>
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
        <TableBody headings={headings} data={dataToDisplay} />
      </table>
    </article>
  );
};
export default Datatable;
