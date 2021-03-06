import styleSheet from './TableHeading.styleSheet';
import globalStyleSheet from '../../utils/style/globalStyle.styleSheet';
import { inlineSvgIcons } from '../../utils/style/inlineSvgIcons';
import { useContext } from 'react';
import { store } from '../../store/store';
import { cx } from '../../utils/style/emotion';
import { HeadingsElementInterface } from '../../utils/types/types';

/**
 * @namespace TableHeading
 */

/**
 * The TableHeading component, display the column headers cells, each one containing a button to activate sort function.
 * There is a sorting icon to inform the user on wich column and which direction is currently used for sorting.
 * Use aria attributes to inform screen reader user as well on current sort.
 * set a minimum column width to avoid the column width variation depending on currently displayed results (if not, column widths change on each page change or filter update).
 * @memberof TableHeading
 * @function
 * @return {React.ReactElement} jsx to be injected in the html.
 */
export const TableHeading = (): React.ReactElement => {
  const {
    headings,
    currentSort,
    displayedColumns,
    columnsMinWidth,
    style,
    dispatch,
  } = useContext(store);

  /**
   * Dispatch the heading being selected by user to set a new sort.
   * @param {object} item - the heading element of the headings array corresponding to the header column being clicked.
   * @memberof TableHeading
   * @function
   */
  const handleClick = (item: HeadingsElementInterface): void => {
    dispatch({
      type: 'setCurrentSort',
      payload: { key: item.key, type: item.type },
    });
  };

  /**
   * An object containing the classnames generated from the stylesheet made with emotion and using the style state of the store
   * @memberof TableHeading
   */
  const classNames: { [Class: string]: string } = styleSheet(style);

  return (
    <thead className={classNames.tableHead}>
      <tr>
        {headings.map((item, index) => (
          <th
            key={item.key}
            className={cx(
              classNames.cell,
              index >= displayedColumns && globalStyleSheet.srOnly
            )}
            style={
              index >= displayedColumns
                ? undefined
                : { minWidth: columnsMinWidth[index] + 'px' }
            }
          >
            <button
              className={classNames.button}
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
                className={classNames.sortIcon}
                src={
                  currentSort.key !== item.key
                    ? inlineSvgIcons.noSort
                    : currentSort.direction > 0
                    ? inlineSvgIcons.ascendingSort
                    : inlineSvgIcons.descendingSort
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
