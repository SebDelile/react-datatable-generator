import { useContext } from 'react';
import { store } from '../../store/store.js';
import { TableRow } from '../TableRow/TableRow.jsx';
import styles from './TableBody.module.css';

export const TableBody = () => {
  const { headings, displayedData, displayedColumns } = useContext(store);

  if (!headings) return null;
  return (
    <tbody className={styles.tbody}>
      {displayedData && displayedData.length ? (
        displayedData.map((item, index) => (
          <TableRow
            key={JSON.stringify(item)}
            item={item}
            displayedColumns={displayedColumns}
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
