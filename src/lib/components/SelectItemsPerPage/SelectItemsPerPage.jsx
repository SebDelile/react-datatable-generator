import { useContext } from 'react';
import { store } from '../../store/store';
import styles from './SelectItemsPerPage.module.css';

/**
 * @namespace SelectItemsPerPage
 */

/**
 * The SelectItemsPerPage component, contain a select dropbox to choose the number of items to display in each page.
 * Selecting a new value will change the selected page in order to kept the first item of the previous display on the new page.
 * @memberof SelectItemsPerPage
 * @function
 * @return {ReactElement} jsx to be injected in the html.
 */
export const SelectItemsPerPage = () => {
  const { itemsPerPage, itemsPerPageOption, dispatch } = useContext(store);

  /**
   * Prevent the default behavior on change.
   * Dispatch the new value for the items per page.
   * @param {object} event - the event object.
   * @memberof SelectItemsPerPage
   */
  const handleChange = (event) => {
    event.preventDefault();
    dispatch({
      type: 'setItemsPerPage',
      payload: parseInt(event.target.value),
    });
  };

  return (
    <label className={styles.wrapper}>
      {'Show'}
      <select
        onChange={handleChange}
        value={itemsPerPage}
        className={styles.select}
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
