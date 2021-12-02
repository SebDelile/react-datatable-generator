import { useContext } from 'react';
import { store } from '../../store/store';
import styleSheet from './ShowDisplayedItems.styleSheet';
import { cx } from '../../utils/style/emotion';

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
  const { currentPage, itemsPerPage, filteredData, data, width, style } =
    useContext(store);
  const filteredDataLength = filteredData.length;
  const unfiltredDataLength = data.length;

  if (!currentPage || !itemsPerPage || !filteredDataLength) return null;
  const firstItem = (currentPage - 1) * itemsPerPage + 1;
  const lastItem = Math.min(currentPage * itemsPerPage, filteredDataLength);

  /**
   * An object containing the classnames generated from the stylesheet made with emotion and using the style state of the store
   * @memberof ShowDisplayedItems
   */
  const classNames = styleSheet(style);

  return (
    <p
      className={cx(classNames.wrapper, width > 800 && classNames.wrapperLarge)}
    >{`Showing ${firstItem} to ${lastItem} of ${filteredDataLength} entries${
      unfiltredDataLength > filteredDataLength
        ? ` (filtered from ${unfiltredDataLength} total entries)`
        : ''
    }`}</p>
  );
};
