import { useContext } from 'react';
import { store } from '../../store/store';
import styles from './ShowDisplayedItems.module.css';

/**
 * @namespace ShowDisplayedItems
 */

/**
 * The ShowDisplayedItems component, to display the index of thecurrently displayed items (ex : "showing 1 to 5 of 12 entries").
 * if there is a filter keyword, shows also the number of total entries (" ... filtered from 25 total entries").
 * @memberof ShowDisplayedItems
 * @function
 * @return {ReactElement} jsx to be injected in the html.
 */
export const ShowDisplayedItems = () => {
  const { currentPage, itemsPerPage, filteredData, data } = useContext(store);
  const filteredDataLength = filteredData.length;
  const unfiltredDataLength = data.length;

  if (!currentPage || !itemsPerPage || !filteredDataLength) return null;
  const firstItem = (currentPage - 1) * itemsPerPage + 1;
  const lastItem = Math.min(currentPage * itemsPerPage, filteredDataLength);
  return (
    <p
      className={styles.wrapper}
    >{`Showing ${firstItem} to ${lastItem} of ${filteredDataLength} entries${
      unfiltredDataLength > filteredDataLength
        ? ` (filtered from ${unfiltredDataLength} total entries)`
        : ''
    }`}</p>
  );
};
