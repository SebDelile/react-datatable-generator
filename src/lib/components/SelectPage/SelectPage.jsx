import { useContext } from 'react';
import { store } from '../../store/store';
import styles from './SelectPage.module.css';

/**
 * @namespace SelectPage
 */

/**
 * The SelectPage component, contain a bunch of buttons to select the page to display : previous x, x, ,x , next.
 * If there are more than 5 pages, there is one or two cuts in order to have small amount of buttons.
 * Buttons being useless are disabled (current page, or previous when 1st page is selected for exemples).
 * @memberof SelectPage
 * @function
 * @return {ReactElement} jsx to be injected in the html.
 */
export const SelectPage = () => {
  const { currentPage, filteredData, itemsPerPage, dispatch } =
    useContext(store);
  const numberOfPages = Math.ceil(filteredData.length / itemsPerPage);

  if (!currentPage || !numberOfPages) return null;
  const buttonList = ['Previous'];
  if (numberOfPages <= 7)
    buttonList.push(...[...Array(numberOfPages)].map((_, i) => i + 1));
  else {
    //no more than 7 total page buttons, cut with '...' at one or two position depending on currentPage.
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

  /**
   * Dispatch the selected page to the store.
   * @memberof SelectPage
   * @param {object} event - the event object from the click event.
   */
  const handleClick = (event) => {
    dispatch({ type: 'setCurrentPage', payload: event.target.value });
  };

  /**
   * Check if a button should have disabled attribute.
   * @memberof SelectPage
   * @param {number|string} page - the event object from the click event.
   */
  const isDisabled = (page) =>
    page === currentPage ||
    page === '...' ||
    (page === 'Previous' && currentPage === 1) ||
    (page === 'Next' && currentPage === numberOfPages);

  /**
   * Check if the button should have the selected classname.
   * @memberof SelectPage
   * @param {number} page - the event object from the click event.
   */
  const selected = (page) => (page === currentPage ? styles.selected : '');

  /**
   * Check if the button should have the hiddenIfNeeded classname.
   * @memberof SelectPage
   * @param {object} event - the event object from the click event.
   */
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
