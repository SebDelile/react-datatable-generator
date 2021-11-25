import { formatDisplayedData } from '../../utils/processing/formatDisplayedData/formatDisplayedData';
import styles from './TableRow.module.css';
import globalStyles from '../../utils/style/globalStyles.module.css';
import { useContext } from 'react';
import { store } from '../../store/store';

export const TableRow = ({ item, parity }) => {
  const {
    headings,
    currentSort,
    moreInfoOpenList,
    displayedColumns,
    dispatch,
  } = useContext(store);
  const hasMoreInfo = displayedColumns !== headings.length;
  const isMoreInfoOpen = moreInfoOpenList.includes(JSON.stringify(item));
  const toggleMoreInfoDisplay = () => {
    dispatch({ type: 'setMoreInfoOpenList', payload: JSON.stringify(item) });
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
              heading.key === currentSort.key ? styles.tdSorted : ''
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
