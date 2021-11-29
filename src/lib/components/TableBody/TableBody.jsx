import { useContext } from 'react';
import { store } from '../../store/store';
import { TableRow } from '../TableRow/TableRow';
import styles from './TableBody.module.css';

/**
 * @namespace TableBody
 */

/**
 * The TableBody component, display a TableRow component for each data.
 * Gives the row a parity attribute (even or odd).
 * If there is no data to display, it displays a unique row with a no match message.
 * @memberof TableBody
 * @function
 * @return {ReactElement} jsx to be injected in the html.
 */
export const TableBody = () => {
  const { headings, displayedData } = useContext(store);

  if (!headings) return null;
  return (
    <tbody className={styles.tbody}>
      {displayedData && displayedData.length ? (
        displayedData.map((item, index) => (
          <TableRow
            key={JSON.stringify(item)}
            item={item}
            parity={index % 2 === 0 ? 'even' : 'odd'}
          />
        ))
      ) : (
        <tr className={styles.tr}>
          <td
            colSpan={headings.length}
            className={`${styles.noMatch} ${styles.td}`}
          >
            No matching records found
          </td>
        </tr>
      )}
    </tbody>
  );
};
