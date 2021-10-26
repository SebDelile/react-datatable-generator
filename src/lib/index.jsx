import { useEffect, useState } from 'react';
import { Filter } from './components/Filter/Filter.jsx';
import { Table } from './components/Table/Table.jsx';
import { filterHandler } from './handlers/filterHandler/filterHandler.js';

const Datatable = ({ headings, data }) => {
  const [filterKeyword, setFilterKeyword] = useState('');
  const [dataToDisplay, setDataToDisplay] = useState(data);

  useEffect(() => {
    const filteredData = filterHandler(data, filterKeyword);
    setDataToDisplay(filteredData);
  }, [data, filterKeyword]);

  return (
    <article>
      <Filter setFilterKeyword={setFilterKeyword} />
      <Table headings={headings} data={dataToDisplay} />
    </article>
  );
};
export default Datatable;
