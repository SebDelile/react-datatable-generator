import { Table } from './components/Table/Table.jsx';

const Datatable = ({ headings, data }) => (
  <article>
    <Table headings={headings} data={data} />
  </article>
);
export default Datatable;
