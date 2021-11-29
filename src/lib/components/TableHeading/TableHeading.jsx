import styles from './TableHeading.module.css';
import globalStyles from '../../utils/style/globalStyles.module.css';
import noSortIcon from '../../assets/icon-no-sort.svg';
import ascendingSortIcon from '../../assets/icon-ascending-sort.svg';
import descendingSortIcon from '../../assets/icon-descending-sort.svg';
import { useContext } from 'react';
import { store } from '../../store/store';

/**
 * @namespace TableHeading
 */

/**
 * The TableHeading component, display the column headers cells, each one containing a button to activate sort function.
 * There is a sorting icon to inform the user on wich column and which direction is currently used for sorting.
 * Use aria attributes to inform screen reader user as well on current sort.
 * set a minimum column width to avoid the column width variation depending on currently displayed results (if not, column widths change on each page change or filter update).
 * @memberof TableHeading
 * @function
 * @return {ReactElement} jsx to be injected in the html.
 */
export const TableHeading = () => {
  const { headings, currentSort, displayedColumns, columnsMinWidth, dispatch } =
    useContext(store);

  if (!headings) return null;

  /**
   * Dispatch the heading being selected by user to set a new sort.
   * @param {object} item - the heading element of the headings array corresponding to the header column being clicked.
   * @memberof TableHeading
   */
  const handleClick = (item) => {
    dispatch({
      type: 'setCurrentSort',
      payload: { key: item.key, type: item.type },
    });
  };

  return (
    <thead className={styles.thead}>
      <tr>
        {headings.map((item, index) => (
          <th
            key={item.key}
            className={`${styles.th} ${
              index >= displayedColumns ? globalStyles.srOnly : ''
            }`}
            style={
              index >= displayedColumns
                ? undefined
                : { minWidth: columnsMinWidth[index] + 'px' }
            }
          >
            <button
              className={styles.button}
              type="button"
              onClick={() => handleClick(item)}
              aria-label={
                currentSort.key === item.key
                  ? `${item.label}, currently selected as ${
                      currentSort.direction > 0 ? 'ascending' : 'descending'
                    } sort`
                  : `${item.label}, click to sort with this key`
              }
            >
              {item.label}
              <img
                className={styles.image}
                src={
                  currentSort.key !== item.key
                    ? noSortIcon
                    : currentSort.direction > 0
                    ? ascendingSortIcon
                    : descendingSortIcon
                }
                aria-hidden
                alt={
                  currentSort.key !== item.key
                    ? 'no sort'
                    : currentSort.direction > 0
                    ? 'ascending sort'
                    : 'descending sort'
                }
              />
            </button>
          </th>
        ))}
      </tr>
    </thead>
  );
};
