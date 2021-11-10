import { TableRow } from '../TableRow/TableRow.jsx';
import styles from './TableBody.module.css';

export const TableBody = ({
  headings,
  data,
  currentSortKey,
  displayedColumns,
}) => {
  if (!headings) return null;
  return (
    <tbody className={styles.tbody}>
      {data && data.length ? (
        data.map((item, index) => (
          <TableRow
            key={JSON.stringify(item)}
            item={item}
            headings={headings}
            displayedColumns={displayedColumns}
            currentSortKey={currentSortKey}
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
