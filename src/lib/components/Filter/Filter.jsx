import styles from './Filter.module.css';
import iconClose from '../../assets/icon-close.svg';

export const Filter = ({ filterKeyword, setFilterKeyword }) => {
  const handleInputChange = (event) => {
    event.preventDefault();
    setFilterKeyword(event.target.value);
  };

  const handleReset = () => {
    setFilterKeyword('');
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
