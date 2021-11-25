import { StoreProvider } from './store/store';
import { SelectItemsPerPage } from './components/SelectItemsPerPage/SelectItemsPerPage';
import { Filter } from './components/Filter/Filter';
import { Table } from './components/Table/Table';
import { TableHeading } from './components/TableHeading/TableHeading';
import { TableBody } from './components/TableBody/TableBody';
import { ShowDisplayedItems } from './components/ShowDisplayedItems/ShowDisplayedItems';
import { SelectPage } from './components/SelectPage/SelectPage';
import styles from './index.module.css';

const Datatable = ({
  headings,
  data,
  itemsPerPageOption = [10, 25, 50, 100],
  isScrollable = false,
  cellInterTextLength = 32,
}) => {
  const isHeadingsKeysInvalid = () =>
    headings.length === 0 ||
    headings.some(
      (heading) =>
        !heading.key ||
        typeof heading.key !== 'string' ||
        typeof heading.label !== 'string'
    ) ||
    new Set(headings.map((heading) => heading.key)).size !== headings.length;

  if (
    !headings ||
    !Array.isArray(headings) ||
    isHeadingsKeysInvalid() ||
    !data ||
    !Array.isArray(data) ||
    data.some((item) => typeof item !== 'object')
  )
    return null;
  else
    return (
      <article className={styles.datatable}>
        <StoreProvider
          headings={headings}
          data={data}
          itemsPerPageOption={itemsPerPageOption}
          isScrollable={isScrollable}
          cellInterTextLength={cellInterTextLength}
        >
          <SelectItemsPerPage />
          <Filter />
          <Table>
            <TableHeading />
            <TableBody />
          </Table>
          <ShowDisplayedItems />
          <SelectPage />
        </StoreProvider>
      </article>
    );
};
export default Datatable;
