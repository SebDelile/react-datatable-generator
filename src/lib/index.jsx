import { StoreProvider } from './store/store';
import { SelectItemsPerPage } from './components/SelectItemsPerPage/SelectItemsPerPage';
import { Filter } from './components/Filter/Filter';
import { Table } from './components/Table/Table';
import { TableHeading } from './components/TableHeading/TableHeading';
import { TableBody } from './components/TableBody/TableBody';
import { ShowDisplayedItems } from './components/ShowDisplayedItems/ShowDisplayedItems';
import { SelectPage } from './components/SelectPage/SelectPage';
import { Wrapper } from './components/Wrapper/Wrapper';
import { defaultStyle } from './utils/style/defaultStyle';

/**
 * The main component to generate a datatable. Contains a check for the validity of the headings and data props (do not return anything in case of invalidity).
 * @memberof Datatable
 * @function
 * @param {array} props.headings - mandatory, used to build the column headers, have to be in the form of an array of objects with the shape being {key:string, label:string, type: function||string} (type is optionnal, key must be unique in array)
 * @param {array} props.data - mandatory, used to build the data ro of the table, have to be an array of object with the shape being {key1:value, key2:value, ...} only the keys matching a key in headings will be displayed.
 * @param {string} props.className - an optionnal list of space separated classes to be applied to the datatable wrapper.
 * @param {array} props.itemsPerPageOption - an optionnal list of the available values for the number of items to display per page. Default is [10, 25, 50, 100]
 * @param {boolean} props.isScrollable - an optionnal value to stand if the column not being displayed within the screen should be get by horizontal scroll (true) or by clicking on a row to expand missing value (false). Default value is false.
 * @param {object} props.style - an optionnal set of style rules to choose between a predefined list to override existing rules. Default is {}
 * @return {ReactElement} jsx to be injected in the html
 */

const Datatable = ({
  headings,
  data,
  className = '',
  itemsPerPageOption = [10, 25, 50, 100],
  isScrollable = false,
  customStyle = {},
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
        style={{ ...defaultStyle, ...customStyle }}
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

//-----namespace initializers for jsdoc generated documentation
/**
 * @namespace Datatable
 */
/**
 * @namespace store
 */
/**
 * all handlers (handling calculation on data).
 * @namespace handlers
 */
/**
 * all utils functions.
 * @namespace utils
 */
