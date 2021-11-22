import { useState, useEffect, useRef, Children, cloneElement } from 'react';
import { columnsMinWidthCalc } from '../../utils/columnsMinWidthCalc/columnsMinWidthCalc.js';
import styles from './Table.module.css';

export const Table = ({ headings, data, children, isScrollable }) => {
  const arrayItems = headings.length;
  const cellInterTextLength = 32; // to get from options
  const [width, setWidth] = useState(0);
  const [columnsMinWidth, setColumnsMinWith] = useState(
    Array(arrayItems).fill(0)
  );
  const [displayedColumns, setDisplayedColumns] = useState(arrayItems);
  const [readyToDisplay, setReadyToDisplay] = useState(false);
  const ref = useRef(null);

  const updateWidth = () => {
    setWidth(ref.current.offsetWidth);
  };

  useEffect(() => {
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  useEffect(() => {
    setColumnsMinWith(
      columnsMinWidthCalc(headings, data).map(
        (minWidth) => minWidth + cellInterTextLength
      )
    );
  }, [data, headings]);

  useEffect(() => {
    let i = 1;
    let widthSum = columnsMinWidth[0];
    while (i < arrayItems) {
      widthSum += columnsMinWidth[i];
      if (widthSum >= width) break;
      else i++;
    }
    if (!isScrollable) setDisplayedColumns(i);
    if (isScrollable || width !== 0) setReadyToDisplay(true);
  }, [width, columnsMinWidth, arrayItems, isScrollable]);

  return (
    <table
      ref={ref}
      className={`${styles.table} ${
        isScrollable && width <= columnsMinWidth.reduce((a, b) => a + b)
          ? styles.tableBlock
          : ''
      }`}
    >
      {readyToDisplay
        ? Children.map(children, (child) =>
            cloneElement(child, {
              displayedColumns: displayedColumns,
              columnsMinWidth: columnsMinWidth,
            })
          )
        : null}
    </table>
  );
};
