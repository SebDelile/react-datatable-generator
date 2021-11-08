import styles from './ShowDisplayedItems.module.css';

export const ShowDisplayedItems = ({
  currentPage,
  itemsPerPage,
  displayedDataLength,
  unfiltredDataLength = displayedDataLength,
}) => {
  if (!currentPage || !itemsPerPage || !displayedDataLength) return null;
  const firstItem = (currentPage - 1) * itemsPerPage + 1;
  const lastItem = Math.min(currentPage * itemsPerPage, displayedDataLength);
  return (
    <p
      className={styles.wrapper}
    >{`Showing ${firstItem} to ${lastItem} of ${displayedDataLength} entries${
      unfiltredDataLength > displayedDataLength
        ? ` (filtered from ${unfiltredDataLength} total entries)`
        : ''
    }`}</p>
  );
};
