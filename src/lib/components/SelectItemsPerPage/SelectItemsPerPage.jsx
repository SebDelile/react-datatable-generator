import { useContext } from 'react';
import { store } from '../../store/store';
import styles from './SelectItemsPerPage.module.css';

export const SelectItemsPerPage = () => {
  const { itemsPerPage, itemsPerPageOption, dispatch } = useContext(store);

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
