import { render } from '@testing-library/react';
import { store } from '../../store/store';

export const renderWithStore = (ui, contextValues, renderOptions) => {
  const StoreProvider = ({ children }) => (
    <store.Provider value={contextValues}>{children}</store.Provider>
  );
  return render(<StoreProvider>{ui}</StoreProvider>, renderOptions);
};
