import { useContext } from 'react';
import { store } from '../../store/store.js';
import styles from './SelectPage.module.css';

export const SelectPage = () => {
  const { currentPage, filteredData, itemsPerPage, dispatch } =
    useContext(store);
  const numberOfPages = Math.ceil(filteredData.length / itemsPerPage);

  if (!currentPage || !numberOfPages) return null;
  const buttonList = ['Previous'];
  if (numberOfPages <= 7)
    buttonList.push(...[...Array(numberOfPages)].map((_, i) => i + 1));
  else {
    //no more than 7 total page buttons, cut with '...' at one or two position depending on currentPage
    if (currentPage <= 4) buttonList.push(1, 2, 3, 4, 5, '...', numberOfPages);
    else if (currentPage >= numberOfPages - 3)
      buttonList.push(
        1,
        '...',
        ...[...Array(5)].map((_, i) => numberOfPages - 4 + i)
      );
    else
      buttonList.push(
        1,
        '...',
        ...[...Array(3)].map((_, i) => currentPage - 1 + i),
        '...',
        numberOfPages
      );
  }
  buttonList.push('Next');

  const handleClick = (event) => {
    dispatch({ type: 'setCurrentPage', payload: event.target.value });
  };

  const isDisabled = (page) =>
    page === currentPage ||
    page === '...' ||
    (page === 'Previous' && currentPage === 1) ||
    (page === 'Next' && currentPage === numberOfPages);

  const selected = (page) => (page === currentPage ? styles.selected : '');

  const hiddenIfNeeded = (page) =>
    numberOfPages > 5 && (page === 'Previous' || page === 'Next')
      ? styles.HiddenIfNeeded
      : '';

  return (
    <div className={styles.wrapper}>
      {buttonList.map((page, i) => (
        <button
          key={i}
          type="button"
          disabled={isDisabled(page)}
          onClick={handleClick}
          value={page}
          className={`${styles.button} ${hiddenIfNeeded(page)} ${selected(
            page
          )}`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};
