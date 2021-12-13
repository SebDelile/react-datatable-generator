import { formatDisplayedData } from '../../utils/processing/formatDisplayedData/formatDisplayedData';
import styleSheet from './TableRow.styleSheet';
import globalStyleSheet from '../../utils/style/globalStyle.styleSheet';
import { cx } from '../../utils/style/emotion';
import { useContext } from 'react';
import { store } from '../../store/store';
import { DataElementInterface } from '../../utils/types/types';

/**
 * @namespace TableRow
 */

interface TableRowProps {
  item: DataElementInterface;
  isLastRow?: boolean;
  isOddRow: boolean;
}

/**
 * The TableRow component, displays the data within the TableBody. One TableRow composent per Data item.
 * Displays all the cells no matter what value has the displayedColumns state value, but put the sr-only class to the cell which should not be displayed.
 * this not displayed cells are put within an additional info row with aria-hidden attribute (this row doesn't exist if no data to put into).
 * Uses the state moreInfoOpenList to know if the additionnal info row should be displayed or collapsed.
 * Adds classes to manage the background color of cells depending on parity and current sort.
 * @param {object} item - the data item from the displayed data array.
 * @param {boolean} isOddRow - a bool depending on the row parity.
 * @param {boolean} isLastRow - a boll depending on the index of data related to data.length, used to correctly display the body border-bottom.
 * @memberof TableRow
 * @function
 * @return {React.ReactElement} jsx to be injected in the html.
 */
export const TableRow = ({
  item,
  isLastRow,
  isOddRow,
}: TableRowProps): React.ReactElement => {
  const {
    headings,
    currentSort,
    moreInfoOpenList,
    displayedColumns,
    style,
    dispatch,
  } = useContext(store);
  const hasMoreInfo: boolean = displayedColumns !== headings.length;
  const isMoreInfoOpen: boolean = moreInfoOpenList.includes(
    JSON.stringify(item)
  );

  /**
   * Dispatch the action to update the displayed status of the clicked row.
   * @memberof TableRow
   * @function
   */
  const toggleMoreInfoDisplay = (): void => {
    dispatch({ type: 'setMoreInfoOpenList', payload: JSON.stringify(item) });
  };

  /**
   * An object containing the classnames generated from the stylesheet made with emotion and using the style state of the store
   * @memberof TableRow
   */
  const classNames: { [Class: string]: string } = styleSheet(style);

  return (
    <>
      <tr
        className={classNames.tableRow}
        data-oddrow={isOddRow ? true : undefined}
        data-clickable={hasMoreInfo ? true : undefined}
        data-hideborderbottom={!isMoreInfoOpen && isLastRow ? true : undefined}
        onClick={hasMoreInfo ? toggleMoreInfoDisplay : undefined}
      >
        {headings.map((heading, index) => (
          <td
            key={heading.key}
            className={cx(
              classNames.cell,
              index >= displayedColumns && globalStyleSheet.srOnly
            )}
            data-sortedcolumn={
              heading.key === currentSort.key ? true : undefined
            }
          >
            {item[heading.key]
              ? formatDisplayedData(item[heading.key], heading.format)
              : ''}
          </td>
        ))}
      </tr>
      {hasMoreInfo ? (
        <tr
          className={classNames.moreInfo}
          data-hidden={isMoreInfoOpen ? undefined : true}
          aria-hidden
          onClick={toggleMoreInfoDisplay}
        >
          <td colSpan={displayedColumns}>
            <table className={classNames.moreInfoTable}>
              <tbody>
                {headings.map((heading, index) =>
                  index < displayedColumns ? null : (
                    <tr className={classNames.moreInfoRow} key={heading.key}>
                      <th className={classNames.moreInfoHeadCell}>
                        {heading.label}
                      </th>
                      <td className={classNames.moreInfoBodyCell}>
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
