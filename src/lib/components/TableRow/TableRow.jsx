import { formatDisplayedData } from '../../utils/processing/formatDisplayedData/formatDisplayedData';
import styles from './TableRow.module.css';
import globalStyles from '../../utils/style/globalStyles.module.css';
import { useContext } from 'react';
import { store } from '../../store/store';

/**
 * @namespace TableRow
 */

/**
 * The TableRow component, displays the data within the TableBody. One TableRow composent per Data item.
 * Displays all the cells no matter what value has the displayedColumns state value, but put the sr-only class to the cell which should not be displayed.
 * this not displayed cells are put within an additional info row with aria-hidden attribute (this row doesn't exist if no data to put into).
 * Uses the state moreInfoOpenList to know if the additionnal info row should be displayed or collapsed.
 * Adds classes to manage the background color of cells depending on parity and current sort.
 * @param {object} item - the data item from the displayed data array.
 * @param {string} parity - the row parity, even or odd.
 * @memberof TableRow
 * @function
 * @return {ReactElement} jsx to be injected in the html.
 */
export const TableRow = ({ item, parity }) => {
  const {
    headings,
    currentSort,
    moreInfoOpenList,
    displayedColumns,
    dispatch,
  } = useContext(store);
  const hasMoreInfo = displayedColumns !== headings.length;
  const isMoreInfoOpen = moreInfoOpenList.includes(JSON.stringify(item));

  /**
   * Dispatch the action to update the displayed status of the clicked row.
   * @memberof TableRow
   */
  const toggleMoreInfoDisplay = () => {
    dispatch({ type: 'setMoreInfoOpenList', payload: JSON.stringify(item) });
  };

  return (
    <>
      <tr
        className={`${styles.trNormal} ${styles[parity]} ${
          hasMoreInfo ? styles.clickable : ''
        }`}
        onClick={hasMoreInfo ? toggleMoreInfoDisplay : undefined}
      >
        {headings.map((heading, index) => (
          <td
            key={heading.key}
            className={`${styles.tdNormal} ${
              heading.key === currentSort.key ? styles.tdSorted : ''
            } ${index >= displayedColumns ? globalStyles.srOnly : ''}`}
          >
            {item[heading.key]
              ? formatDisplayedData(item[heading.key], heading.format)
              : ''}
          </td>
        ))}
      </tr>
      {hasMoreInfo ? (
        <tr
          className={`${!isMoreInfoOpen ? styles.trMoreInfoHidden : ''}`}
          aria-hidden
        >
          <td colSpan={displayedColumns}>
            <table className={styles.tableMoreInfo}>
              <tbody>
                {headings.map((heading, index) =>
                  index < displayedColumns ? null : (
                    <tr className={styles.trMoreInfoInner} key={heading.key}>
                      <th className={styles.thMoreInfoInner}>
                        {heading.label}
                      </th>
                      <td className={styles.tdMoreInfoInner}>
                        {item[heading.key]}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </td>
        </tr>
      ) : null}
    </>
  );
};
