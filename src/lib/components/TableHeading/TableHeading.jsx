import styles from './TableHeading.module.css';
import noSortIcon from '../../assets/icon-no-sort.svg';
import ascendingSortIcon from '../../assets/icon-ascending-sort.svg';
import descendingSortIcon from '../../assets/icon-descending-sort.svg';

export const TableHeading = ({ headings, currentSort, setCurrentSort }) => {
  if (!headings) return null;

  const handleClick = (item) => {
    if (currentSort.key === item.key && currentSort.direction > 0)
      setCurrentSort({ key: item.key, direction: -1, type: item.type });
    else setCurrentSort({ key: item.key, direction: 1, type: item.type });
  };

  return (
    <thead className={styles.thead}>
      <tr className={styles.tr}>
        {headings.map((item) => (
          <th key={item.key}>
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
