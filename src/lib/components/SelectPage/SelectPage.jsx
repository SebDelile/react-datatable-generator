import { useContext } from 'react';
import { store } from '../../store/store';
import styleSheet from './SelectPage.styleSheet';
import { cx } from '@emotion/css';

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
  const { currentPage, filteredData, itemsPerPage, width, style, dispatch } =
    useContext(store);
  const numberOfPages = Math.ceil(filteredData.length / itemsPerPage);

  if (!currentPage || !numberOfPages) return null;
  const buttonList = ['Previous'];
  if (numberOfPages <= 7) {
    let i = 1;
    while (i <= numberOfPages) {
      buttonList.push(i);
      i++;
    }
  } else {
    //no more than 7 total page buttons, cut with '...' at one or two position depending on currentPage.
    if (currentPage <= 4) buttonList.push(1, 2, 3, 4, 5, '...', numberOfPages);
    else if (currentPage >= numberOfPages - 3)
      buttonList.push(
        1,
        '...',
        numberOfPages - 4,
        numberOfPages - 3,
        numberOfPages - 2,
        numberOfPages - 1,
        numberOfPages
      );
    else
      buttonList.push(
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        numberOfPages
      );
  }
  buttonList.push('Next');

  /**
   * Dispatch the selected page to the store.
   * @memberof SelectPage
   * @param {object} event - the event object from the click event.
   * @function
   */
  const handleClick = (event) => {
    dispatch({ type: 'setCurrentPage', payload: event.target.value });
  };

  /**
   * Check if a button should have disabled attribute.
   * @memberof SelectPage
   * @param {number|string} page - the event object from the click event.
   * @function
   */
  const isDisabled = (page) =>
    page === currentPage ||
    page === '...' ||
    (page === 'Previous' && currentPage === 1) ||
    (page === 'Next' && currentPage === numberOfPages);

  /**
   * Check if the button should have the hidden class (previous and next button on small screen if there is lot of page ).
   * @memberof SelectPage
   * @param {object} event - the event object from the click event.
   * @function
   */
  const hiddenIfNeeded = (page) =>
    width < 480 && numberOfPages > 5 && (page === 'Previous' || page === 'Next')
      ? true
      : undefined;

  /**
   * An object containing the classnames generated from the stylesheet made with emotion and using the style state of the store
   * @memberof SelectPage
   */
  const classNames = styleSheet(style);

  return (
    <div
      className={cx(classNames.wrapper, width > 800 && classNames.wrapperLarge)}
    >
      {buttonList.map((page, i) => (
        <button
          key={i}
          type="button"
          disabled={isDisabled(page)}
          onClick={handleClick}
          data-active={page === currentPage ? true : undefined}
          data-hidden={hiddenIfNeeded(page)}
          value={page}
          className={classNames.button}
        >
          {page}
        </button>
      ))}
    </div>
  );
};
