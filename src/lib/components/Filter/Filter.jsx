import styles from './Filter.module.css';
import iconClose from '../../assets/icon-close.svg';
import { useContext } from 'react';
import { store } from '../../store/store';

/**
 * @namespace Filter
 */

/**
 * The filter component, contains an input box to type text in order to filter the rows according to match with the text.
 * When some tet is typed, a reset buttons appear to reset the field.
 * Using double quotes allows to filter with an exact match.
 * @memberof Filter
 * @function
 * @return {ReactElement} jsx to be injected in the html.
 */
export const Filter = () => {
  const { filterKeyword, dispatch } = useContext(store);

  /**
   * Dispatch the new keyword on input change.
   * @param {object} event - the event object.
   * @memberof Filter
   */
  const handleInputChange = (event) => {
    event.preventDefault();
    dispatch({ type: 'setFilterKeyword', payload: event.target.value });
  };

  /**
   * Dispatch the action with empty keyword on click on reset button.
   * @memberof Filter
   */
  const handleReset = () => {
    dispatch({ type: 'setFilterKeyword', payload: '' });
  };

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>Search:</label>
      <input
        className={styles.input}
        type="text"
        value={filterKeyword}
        onChange={handleInputChange}
      />
      {filterKeyword ? (
        <button
          className={styles.resetButton}
          type="button"
          onClick={handleReset}
        >
          <img
            className={styles.resetButtonImage}
            src={iconClose}
            alt="reset keyword field"
          />
        </button>
      ) : null}
    </div>
  );
};
