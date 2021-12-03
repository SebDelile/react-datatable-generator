import { render } from '@testing-library/react';
import { store } from '../../store/store';
import { defaultStyle } from '../style/defaultStyle';
/**
 * Gives a provider fortesting of each needing the access to the store
 * @param {ReactElement} ui - the component to test
 * @param {object} contextValues - the values of the states used by the component and needed for test
 * @param {object} renderOptions - option oject to pass to the render method
 * @memberof utils
 * @returns {ReactElement} - the result of the render method with the ui being wrapped by the provider
 */
export const renderWithStore = (ui, contextValues, renderOptions) => {
  const StoreProvider = ({ children }) => (
    <store.Provider value={{ ...contextValues, style: defaultStyle }}>
      {children}
    </store.Provider>
  );
  return render(<StoreProvider>{ui}</StoreProvider>, renderOptions);
};
