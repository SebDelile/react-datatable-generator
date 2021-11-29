import { useEffect, useRef, useContext } from 'react';
import { store } from '../../store/store';
import styles from './Wrapper.module.css';
import { columnsMinWidthCalc } from '../../utils/processing/columnsMinWidthCalc/columnsMinWidthCalc';

/**
 * @namespace Wrapper
 */

/**
 * The Wrapper component to wrap any component of the pluggin.
 * Has a useEffect to calculate the width of the pluggin container on mount + on each window resize event.
 * Has a useEffect to calculate the minimum width of each column on mount (no reason to have later change).
 * @memberof Wrapper
 * @function
 * @return {ReactElement} jsx to be injected in the html.
 */
export const Wrapper = ({ children, className }) => {
  const { headings, data, cellInterTextLength, width, dispatch } =
    useContext(store);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const columnsMinWidth = columnsMinWidthCalc(
        headings,
        data,
        ref.current,
        cellInterTextLength
      );
      dispatch({ type: 'setColumnsMinWidth', payload: columnsMinWidth });
    }
  }, [ref, dispatch, headings, data, cellInterTextLength]);

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
    <article ref={ref} className={`${styles.wrapper} ${className ?? ''}`}>
      {width !== 0 ? children : null}
    </article>
  );
};
