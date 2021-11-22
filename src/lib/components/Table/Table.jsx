import { useEffect, useRef, useContext } from 'react';
import { GlobalState } from '../../features/GlobalState.jsx';
import styles from './Table.module.css';

export const Table = ({ children }) => {
  const { isScrollable, width, columnsMinWidth, setWidth } =
    useContext(GlobalState);
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
  });

  return (
    <table
      ref={ref}
      className={`${styles.table} ${
        isScrollable && width <= columnsMinWidth.reduce((a, b) => a + b)
          ? styles.tableBlock
          : ''
      }`}
    >
      {width !== 0 ? children : null}
    </table>
  );
};
