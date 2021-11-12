import { formatDisplayedData } from '../../utils/processing/formatDisplayedData/formatDisplayedData.js';
import styles from './TableRow.module.css';
import globalStyles from '../../utils/style/globalStyles.module.css';

export const TableRow = ({
  item,
  headings,
  displayedColumns,
  currentSortKey,
  parity,
  isMoreInfoOpen,
  updateMoreInfoOpenList,
}) => {
  const hasMoreInfo = displayedColumns !== headings.length;
  const toggleMoreInfoDisplay = () => {
    updateMoreInfoOpenList(JSON.stringify(item));
  };

  return (
    <>
      <tr
        className={`${styles.trNormal} ${styles[parity]} ${
          hasMoreInfo ? styles.clickable : ''
        }`}
        onClick={hasMoreInfo ? toggleMoreInfoDisplay : undefined}
      >
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
      {hasMoreInfo ? (
        <tr
          className={`${styles.trMoreInfo} ${
            !isMoreInfoOpen ? styles.trMoreInfoHidden : ''
          }`}
          aria-hidden
        >
          <td colSpan={displayedColumns}>
            <table className={styles.tableHidden}>
              <tbody>
                {headings.map((heading, index) =>
                  index < displayedColumns ? null : (
                    <tr className={styles.trMoreInfoInner} key={heading.key}>
                      <th className={styles.thMoreInfoInner}>
                        {heading.label}
                      </th>
                      <td className={styles.tdMoreInfoInner}>
                        {item[heading.key]}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </td>
        </tr>
      ) : null}
    </>
  );
};
