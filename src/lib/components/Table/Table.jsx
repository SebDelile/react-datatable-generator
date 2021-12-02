import { useContext } from 'react';
import { store } from '../../store/store';
import styleSheet from './Table.styleSheet';
import { cx } from '../../utils/style/emotion';

/**
 * @namespace Table
 */

/**
 * The Table component, display the table. table header and table body are managed separately.
 * Has a condition on width and isScrollable to chose either block or table CSS display.
 * @memberof Table
 * @function
 * @return {ReactElement} jsx to be injected in the html.
 */
export const Table = ({ children }) => {
  const { isScrollable, width, columnsMinWidth } = useContext(store);

  /**
   * An object containing the classnames generated from the stylesheet made with emotion and using the style state of the store
   * @memberof Table
   */
  const classNames = styleSheet();

  return (
    <table
      className={cx(
        classNames.table,
        isScrollable &&
          width <= columnsMinWidth.reduce((a, b) => a + b) &&
          classNames.tableBlock
      )}
    >
      {children}
    </table>
  );
};
