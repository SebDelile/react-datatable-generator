import { useContext } from 'react';
import { store } from '../../store/store';
import { TableRow } from '../TableRow/TableRow';
import styleSheet from './TableBody.styleSheet';

/**
 * @namespace TableBody
 */

/**
 * The TableBody component, display a TableRow component for each data.
 * Gives the row a parity attribute (even or odd).
 * If there is no data to display, it displays a unique row with a no match message.
 * @memberof TableBody
 * @function
 * @return {React.ReactElement} jsx to be injected in the html.
 */
export const TableBody = (): React.ReactElement => {
  const { headings, data, displayedData, style } = useContext(store);

  /**
   * An object containing the classnames generated from the stylesheet made with emotion and using the style state of the store
   * @memberof TableBody
   */
  const classNames: { [Class: string]: string } = styleSheet(style);

  return (
    <tbody className={classNames.tableBody}>
      {displayedData && displayedData.length ? (
        displayedData.map((item, index) => (
          <TableRow
            key={JSON.stringify(item)}
            item={item}
            isLastRow={index === displayedData.length - 1 ? true : undefined}
            isOddRow={index % 2 !== 0}
          />
        ))
      ) : (
        <tr>
          <td colSpan={headings.length} className={classNames.noMatch}>
            {data && data.length
              ? 'No matching records found'
              : 'There are no data to display'}
          </td>
        </tr>
      )}
    </tbody>
  );
};
