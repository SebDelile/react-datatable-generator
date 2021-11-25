import styles from './Filter.module.css';
import iconClose from '../../assets/icon-close.svg';
import { useContext } from 'react';
import { store } from '../../store/store';

export const Filter = () => {
  const { filterKeyword, dispatch } = useContext(store);

  const handleInputChange = (event) => {
    event.preventDefault();
    dispatch({ type: 'setFilterKeyword', payload: event.target.value });
  };

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
