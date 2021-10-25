import { useState } from 'react';
import { Filter } from './components/Filter/Filter.jsx';
import { Table } from './components/Table/Table.jsx';

const Datatable = ({ headings, data }) => {
  const [filterKeyword, setFilterKeyword] = useState('');
  return (
    <article>
      <Filter setFilterKeyword={setFilterKeyword} />
      <Table headings={headings} data={data} />
    </article>
  );
};
export default Datatable;
