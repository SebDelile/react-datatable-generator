import { formatDisplayedData } from '../../utils/processing/formatDisplayedData/formatDisplayedData.js';
import styles from './TableBody.module.css';

export const TableBody = ({ headings, data, currentSortKey }) => {
  if (!headings) return null;
  return (
    <tbody className={styles.tbody}>
      {data && data.length ? (
        data.map((user) => (
          <tr
            key={user.firstName + user.lastName + user.dateOfBirth}
            className={styles.tr}
          >
            {headings.map((item) => (
              <td
                key={item.key}
                className={`${styles.td} ${
                  item.key === currentSortKey ? styles.tdSorted : ''
                }`}
              >
                {user[item.key]
                  ? formatDisplayedData(user[item.key], item.format)
                  : ''}
              </td>
            ))}
          </tr>
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
