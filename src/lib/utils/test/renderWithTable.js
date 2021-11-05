import { render } from '@testing-library/react';

export const renderWithTable = (ui, renderOptions) =>
  render(<table>{ui}</table>, renderOptions);
