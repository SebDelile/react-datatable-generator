import { StyleInterface } from "../types/StyleInterface";

/**
 * The default style for the style rules being customizable.
 * customStyle prop will be merged into it before storing this in the state.
 * @memberof utils
 */
export const defaultStyle: StyleInterface = {
  // global
  allPluginFontFamily: 'inherit',
  allPluginFontSize: 'inherit',
  allPluginFontWeight: undefined,
  allPluginColor: 'inherit',
  allPluginBackground: 'none',
  // table borders
  tableBodyVerticalBorder: undefined,
  tableBodyHorizontalBorder: '1px solid #000',
  tableHeadVerticalBorder: undefined,
  tableHeadHorizontalBorder: undefined,
  tableCellVerticalBorder: undefined,
  tableCellHorizontalBorder: '1px solid #DDD',
  moreInfoTableHorizontalBorder: '1px solid #EFEFEF',
  // table background color
  tableHeadBackground: '#FFF',
  tableBodyBackground: '#FFF',
  tableOddRowBackground: '#F7F7F7',
  tableSortedColumnBackground: '#FAFAFA',
  tableSortedColumnOddRowBackground: '#F1F1F1',
  tableHoveredRowBackground: '#F1F1F1',
  tableSortedColumnHoveredRowBackground: '#EAEAEA',
  moreInfoTableBackground: '#FFF',
  // table text
  tableCellPadding: '0.5rem 1rem',
  tableHeadTextAlign: 'center',
  tableBodyTextAlign: 'left',
  tableBodyFontFamily: 'inherit',
  tableHeadFontFamily: 'inherit',
  tableBodyFontSize: 'inherit',
  tableHeadFontSize: 'inherit',
  tableBodyFontWeight: undefined,
  tableHeadFontWeight: '700',
  tableBodyColor: 'inherit',
  tableHeadColor: 'inherit',
  // moreInfoTable text
  moreInfoTableMarginLeft: '0.5rem',
  moreInfoTableCellPadding: '0.5rem',
  moreInfoTableBodyFontFamily: 'inherit',
  moreInfoTableHeadFontFamily: 'inherit',
  moreInfoTableBodyFontSize: 'inherit',
  moreInfoTableHeadFontSize: 'inherit',
  moreInfoTableBodyFontWeight: undefined,
  moreInfoTableHeadFontWeight: '700',
  moreInfoTableBodyColor: 'inherit',
  moreInfoTableHeadColor: 'inherit',
  // selectPage buttons
  selectPageFontFamily: 'inherit',
  selectPageFontSize: 'inherit',
  selectPageFontWeight: undefined,
  selectPageButtonColor: 'inherit',
  selectPageButtonBorder: '1px solid transparent',
  selectPageButtonBorderRadius: '0.25rem',
  selectPageButtonBackground: 'none',
  selectPageButtonDisabledBorder: '1px solid transparent',
  selectPageButtonDisabledBackground: 'none',
  selectPageButtonDisabledColor: '#666',
  selectPageButtonActiveBorder: '1px solid #333',
  selectPageButtonActiveBackground:
    'linear-gradient(to bottom, #FFF 0%, #CCC 100%)',
  selectPageButtonActiveColor: '#000',
  selectPageButtonHoveredBorder: '1px solid #000',
  selectPageButtonHoveredBackground:
    'linear-gradient(to bottom, #333 0%, #000 100%)',
  selectPageButtonHoveredColor: '#FFF',
  // selectItemsPerPage
  selectItemsPerPageFontFamily: 'inherit',
  selectItemsPerPageFontSize: 'inherit',
  selectItemsPerPageFontWeight: undefined,
  selectItemsPerPageColor: 'inherit',
  selectItemsPerPageSelectBackground: undefined,
  selectItemsPerPageSelectColor: 'inherit',
  selectItemsPerPageSelectBorder: undefined,
  selectItemsPerPageSelectBorderRadius: undefined,
  // filter
  filterFontFamily: 'inherit',
  filterFontSize: 'inherit',
  filterFontWeight: undefined,
  filterColor: 'inherit',
  filterInputBackground: undefined,
  filterInputColor: 'inherit',
  filterInputBorder: undefined,
  filterInputBorderRadius: undefined,
  // showDisplayedItems
  showDisplayedItemsFontFamily: 'inherit',
  showDisplayedItemsFontSize: 'inherit',
  showDisplayedItemsFontWeight: undefined,
  showDisplayedItemsColor: 'inherit',
};
