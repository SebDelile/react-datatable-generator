import { StoreProvider } from './store/store';
import { SelectItemsPerPage } from './components/SelectItemsPerPage/SelectItemsPerPage';
import { Filter } from './components/Filter/Filter';
import { Table } from './components/Table/Table';
import { TableHeading } from './components/TableHeading/TableHeading';
import { TableBody } from './components/TableBody/TableBody';
import { ShowDisplayedItems } from './components/ShowDisplayedItems/ShowDisplayedItems';
import { SelectPage } from './components/SelectPage/SelectPage';
import { Wrapper } from './components/Wrapper/Wrapper';

const Datatable = ({
  className,
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
      <StoreProvider
        headings={headings}
        data={data}
        itemsPerPageOption={itemsPerPageOption}
        isScrollable={isScrollable}
        cellInterTextLength={cellInterTextLength}
      >
        <Wrapper className={className}>
          <SelectItemsPerPage />
          <Filter />
          <Table>
            <TableHeading />
            <TableBody />
          </Table>
          <ShowDisplayedItems />
          <SelectPage />
        </Wrapper>
      </StoreProvider>
    );
};
export default Datatable;
