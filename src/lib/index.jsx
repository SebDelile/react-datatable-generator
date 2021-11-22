import { GlobalStateProvider } from './features/GlobalState.jsx';
import { SelectItemsPerPage } from './components/SelectItemsPerPage/SelectItemsPerPage.jsx';
import { Filter } from './components/Filter/Filter.jsx';
import { Table } from './components/Table/Table.jsx';
import { TableHeading } from './components/TableHeading/TableHeading.jsx';
import { TableBody } from './components/TableBody/TableBody.jsx';
import { ShowDisplayedItems } from './components/ShowDisplayedItems/ShowDisplayedItems.jsx';
import { SelectPage } from './components/SelectPage/SelectPage.jsx';
import styles from './index.module.css';

const Datatable = ({
  headings,
  data,
  itemsPerPageOption = [10, 25, 50, 100],
  isScrollable = false,
}) => {
  return (
    <article className={styles.datatable}>
      <GlobalStateProvider
        headings={headings}
        data={data}
        itemsPerPageOption={itemsPerPageOption}
        isScrollable={isScrollable}
      >
        <SelectItemsPerPage />
        <Filter />
        <Table>
          <TableHeading />
          <TableBody />
        </Table>
        <ShowDisplayedItems />
        <SelectPage />
      </GlobalStateProvider>
    </article>
  );
};
export default Datatable;
