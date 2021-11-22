import { formatDisplayedData } from '../../utils/processing/formatDisplayedData/formatDisplayedData.js';
import styles from './TableRow.module.css';
import globalStyles from '../../utils/style/globalStyles.module.css';
import { useContext } from 'react';
import { GlobalState } from '../../features/GlobalState.jsx';

export const TableRow = ({ item, displayedColumns, parity }) => {
  const { headings, currentSortKey, moreInfoOpenList, updateMoreInfoOpenList } =
    useContext(GlobalState);
  const hasMoreInfo = displayedColumns !== headings.length;
  const isMoreInfoOpen = moreInfoOpenList.includes(JSON.stringify(item));
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
          className={`${!isMoreInfoOpen ? styles.trMoreInfoHidden : ''}`}
          aria-hidden
        >
          <td colSpan={displayedColumns}>
            <table className={styles.tableMoreInfo}>
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
