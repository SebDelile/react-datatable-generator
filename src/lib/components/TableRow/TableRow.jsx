import { formatDisplayedData } from '../../utils/processing/formatDisplayedData/formatDisplayedData.js';
import styles from './TableRow.module.css';
import globalStyles from '../../utils/style/globalStyles.module.css';

export const TableRow = ({
  item,
  headings,
  displayedColumns,
  currentSortKey,
  parity,
}) => (
  <>
    <tr className={`${styles.trNormal} ${styles[parity]}`}>
      {headings.map((heading, index) => (
        <td
          key={heading.key}
          className={`${styles.tdNormal} ${
            heading.key === currentSortKey ? styles.tdSorted : ''
          } ${index >= displayedColumns ? globalStyles.srOnly : ''}`}
        >
          {item[heading.key]
            ? formatDisplayedData(item[heading.key], heading.format)
            : ''}
        </td>
      ))}
    </tr>
    {displayedColumns === headings.length ? null : (
      <tr className={styles.trHidden} aria-hidden>
        <td colSpan={displayedColumns}>
          <table className={styles.tableHidden}>
            <tbody>
              {headings.map((heading, index) =>
                index < displayedColumns ? null : (
                  <tr className={styles.trHiddenInner} key={heading.key}>
                    <th className={styles.thHiddenInner}>{heading.label}</th>
                    <td className={styles.tdHiddenInner}>
                      {item[heading.key]}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </td>
      </tr>
    )}
  </>
);
