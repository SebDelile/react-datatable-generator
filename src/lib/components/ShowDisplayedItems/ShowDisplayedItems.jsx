export const ShowDisplayedItems = ({
  page,
  itemsPerPage,
  displayedDataLength,
  unfiltredDataLength = displayedDataLength,
}) => {
  if (!page || !itemsPerPage || !displayedDataLength) return null;
  const firstItem = (page - 1) * itemsPerPage + 1;
  const lastItem = Math.min(page * itemsPerPage, displayedDataLength);
  return (
    <p>{`Showing ${firstItem} to ${lastItem} of ${displayedDataLength} entries${
      unfiltredDataLength > displayedDataLength
        ? ` (filtered from ${unfiltredDataLength} total entries)`
        : ''
    }`}</p>
  );
};
