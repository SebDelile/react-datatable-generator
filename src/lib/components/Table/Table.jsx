import { useContext } from 'react';
import { store } from '../../store/store';
import styles from './Table.module.css';

export const Table = ({ children }) => {
  const { isScrollable, width, columnsMinWidth } = useContext(store);

  return (
    <table
      className={`${styles.table} ${
        isScrollable && width <= columnsMinWidth.reduce((a, b) => a + b)
          ? styles.tableBlock
          : ''
      }`}
    >
      {children}
    </table>
  );
};
