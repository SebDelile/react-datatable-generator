import styleSheet from './Filter.styleSheet';
import { useContext } from 'react';
import { store } from '../../store/store';
import { cx } from '../../utils/style/emotion';
import { inlineSvgIcons } from '../../utils/style/inlineSvgIcons';

/**
 * @namespace Filter
 */

/**
 * The filter component, contains an input box to type text in order to filter the rows according to match with the text.
 * When some tet is typed, a reset buttons appear to reset the field.
 * Using double quotes allows to filter with an exact match.
 * @memberof Filter
 * @function
 * @return {React.ReactElement} jsx to be injected in the html.
 */
export const Filter = (): React.ReactElement => {
  const { filterKeyword, width, style, dispatch } = useContext(store);

  /**
   * Dispatch the new keyword on input change.
   * @param {React.ChangeEvent<HTMLInputElement>} event - the event object.
   * @memberof Filter
   * @function
   */
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    event.preventDefault();
    dispatch({ type: 'setFilterKeyword', payload: event.target.value });
  };

  /**
   * Dispatch the action with empty keyword on click on reset button.
   * @memberof Filter
   * @function
   */
  const handleReset = (): void => {
    dispatch({ type: 'setFilterKeyword', payload: '' });
  };

  /**
   * An object containing the classnames generated from the stylesheet made with emotion and using the style state of the store
   * @type {object}
   * @memberof Filter
   */
  const classNames: { [Class: string]: string } = styleSheet(style);

  return (
    <label
      className={cx(classNames.wrapper, width > 480 && classNames.wrapperLarge)}
    >
      Search:
      <input
        className={classNames.input}
        type="text"
        value={filterKeyword}
        onChange={handleInputChange}
      />
      {filterKeyword ? (
        <button
          className={classNames.resetButton}
          type="button"
          onClick={handleReset}
        >
          <img
            className={classNames.resetButtonImage}
            src={inlineSvgIcons.resetFilter}
            alt="reset keyword field"
          />
        </button>
      ) : null}
    </label>
  );
};
