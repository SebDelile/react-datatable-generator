import { useContext } from 'react';
import { store } from '../../store/store.js';
import styles from './ShowDisplayedItems.module.css';

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
