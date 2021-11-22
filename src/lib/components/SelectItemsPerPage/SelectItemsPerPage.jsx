import { useContext } from 'react';
import { GlobalState } from '../../features/GlobalState';
import styles from './SelectItemsPerPage.module.css';

export const SelectItemsPerPage = () => {
  const { itemsPerPage, updateItemsPerPage, itemsPerPageOption } =
    useContext(GlobalState);

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
