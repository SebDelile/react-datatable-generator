import { useContext } from 'react';
import { store } from '../../store/store';
import styles from './Table.module.css';

/**
 * @namespace Table
 */

/**
 * The Table component, display the table. table header and table body are managed separately.
 * Has a condition on width and isScrollable to chose either block or table CSS display.
 * @memberof Table
 * @function
 * @return {ReactElement} jsx to be injected in the html.
 */
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
