import { useContext } from 'react';
import { store } from '../../store/store';
import styleSheet from './SelectItemsPerPage.styleSheet';
import { cx } from '../../utils/style/emotion';

/**
 * @namespace SelectItemsPerPage
 */

/**
 * The SelectItemsPerPage component, contain a select dropbox to choose the number of items to display in each page.
 * Selecting a new value will change the selected page in order to kept the first item of the previous display on the new page.
 * @memberof SelectItemsPerPage
 * @function
 * @return {React.ReactElement} jsx to be injected in the html.
 */
export const SelectItemsPerPage = (): React.ReactElement => {
  const { itemsPerPage, itemsPerPageOption, style, width, dispatch } =
    useContext(store);

  /**
   * Prevent the default behavior on change.
   * Dispatch the new value for the items per page.
   * @param {React.ChangeEvent<HTMLSelectElement>} event - the event object.
   * @memberof SelectItemsPerPage
   * @function
   */
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    event.preventDefault();
    dispatch({
      type: 'setItemsPerPage',
      payload: parseInt(event.target.value),
    });
  };

  /**
   * An object containing the classnames generated from the stylesheet made with emotion and using the style state of the store
   * @memberof SelectItemsPerPage
   */
  const classNames: { [Class: string]: string } = styleSheet(style);

  return (
    <label
      className={cx(classNames.wrapper, width > 480 && classNames.wrapperLarge)}
    >
      {'Show'}
      <select
        onChange={handleChange}
        value={itemsPerPage}
        className={classNames.select}
      >
        {itemsPerPageOption.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {'entries'}
    </label>
  );
};
