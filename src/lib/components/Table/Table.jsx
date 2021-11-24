import { useEffect, useRef, useContext } from 'react';
import { store } from '../../store/store.js';
import styles from './Table.module.css';

export const Table = ({ children }) => {
  const { isScrollable, width, columnsMinWidth, dispatch } = useContext(store);
  const ref = useRef(null);

  useEffect(() => {
    const updateWidth = () => {
      const currentWidth = ref.current.offsetWidth;
      dispatch({ type: 'setWidth', payload: currentWidth });
      dispatch({ type: 'setDisplayedColumns', payload: currentWidth });
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, [dispatch]);

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
