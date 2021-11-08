import styles from './SelectItemsPerPage.module.css';

export const SelectItemsPerPage = ({
  itemsPerPage,
  updateItemsPerPage,
  options,
}) => {
  const handleChange = (event) => {
    event.preventDefault();
    updateItemsPerPage(parseInt(event.target.value));
  };

  return (
    <label className={styles.wrapper}>
      {'Show'}
      <select
        onChange={handleChange}
        value={itemsPerPage}
        className={styles.select}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {'entries'}
    </label>
  );
};
