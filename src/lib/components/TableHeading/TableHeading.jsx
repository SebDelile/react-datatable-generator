import styles from './TableHeading.module.css';
import globalStyles from '../../utils/style/globalStyles.module.css';
import noSortIcon from '../../assets/icon-no-sort.svg';
import ascendingSortIcon from '../../assets/icon-ascending-sort.svg';
import descendingSortIcon from '../../assets/icon-descending-sort.svg';

export const TableHeading = ({
  headings,
  currentSort,
  setCurrentSort,
  displayedColumns,
}) => {
  if (!headings) return null;

  const handleClick = (item) => {
    if (currentSort.key === item.key && currentSort.direction > 0)
      setCurrentSort({ key: item.key, direction: -1, type: item.type });
    else setCurrentSort({ key: item.key, direction: 1, type: item.type });
  };

  return (
    <thead className={styles.thead}>
      <tr>
        {headings.map((item, index) => (
          <th
            key={item.key}
            className={`${styles.th} ${
              index >= displayedColumns ? globalStyles.srOnly : ''
            }`}
          >
            <button
              className={styles.button}
              type="button"
              onClick={() => handleClick(item)}
              aria-label={
                currentSort.key === item.key
                  ? `${item.label}, currently selected as ${
                      currentSort.direction > 0 ? 'ascending' : 'descending'
                    } sort`
                  : `${item.label}, click to sort with this key`
              }
            >
              {item.label}
              <img
                className={styles.image}
                src={
                  currentSort.key !== item.key
                    ? noSortIcon
                    : currentSort.direction > 0
                    ? ascendingSortIcon
                    : descendingSortIcon
                }
                aria-hidden
                alt={
                  currentSort.key !== item.key
                    ? 'no sort'
                    : currentSort.direction > 0
                    ? 'ascending sort'
                    : 'descending sort'
                }
              />
            </button>
          </th>
        ))}
      </tr>
    </thead>
  );
};
