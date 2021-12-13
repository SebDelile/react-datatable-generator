import { useEffect, useRef, useContext } from 'react';
import { store } from '../../store/store';
import styleSheet from './Wrapper.styleSheet';
import { columnsMinWidthCalc } from '../../utils/processing/columnsMinWidthCalc/columnsMinWidthCalc';
import { cx } from '../../utils/style/emotion';
import { getTableBorderWidth } from '../../utils/processing/getTableBorderWidth/getTableBorderWidth';

/**
 * @namespace Wrapper
 */

interface WrapperProps {
  className?: string;
  children: React.ReactElement | React.ReactElement[];
}

/**
 * The Wrapper component to wrap any component of the pluggin.
 * Has a useEffect to calculate the width of the pluggin container on mount + on each window resize event.
 * Has a useEffect to calculate the minimum width of each column on mount (no reason to have later change).
 * @memberof Wrapper
 * @function
 * @return {React.ReactElement} jsx to be injected in the html.
 */
export const Wrapper = ({
  children,
  className,
}: WrapperProps): React.ReactElement => {
  const { headings, data, width, style, dispatch } = useContext(store);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const columnsMinWidth = columnsMinWidthCalc(
        headings,
        data,
        ref.current,
        style
      );
      dispatch({ type: 'setColumnsMinWidth', payload: columnsMinWidth });
    }
  }, [ref, dispatch, headings, data, style]);

  useEffect(() => {
    const updateWidth = (): void => {
      const refStyle: CSSStyleDeclaration = getComputedStyle(ref.current);
      const currentWidth: number =
        parseInt(refStyle.width) -
        parseInt(refStyle.borderLeftWidth) -
        parseInt(refStyle.borderRightWidth);
      const borderWidth: number = getTableBorderWidth(style);
      dispatch({ type: 'setWidth', payload: currentWidth - borderWidth });
      dispatch({
        type: 'setDisplayedColumns',
        payload: currentWidth - borderWidth,
      });
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, [dispatch, style]);

  /**
   * An object containing the classnames generated from the stylesheet made with emotion and using the style state of the store
   * @memberof Wrapper
   */
  const classNames: { [Class: string]: string } = styleSheet(style);

  return (
    <article
      ref={ref}
      className={cx(
        classNames.wrapper,
        width > 480 && classNames.wrapperLarge,
        width > 800 && classNames.wrapperExtraLarge,
        className
      )}
    >
      {width !== 0 ? children : null}
    </article>
  );
};
