# react-datatable-generator

react-datatable-generator is a library providing a datatable component to be used within any React app. It is created with `create-react-app` and a custom instance of emotion/css for the style, so there is no conflict whatever is the styling method you are using in you app.

## Features

- **Pagination** : bunch of buttons to navigate between pages and customizable the number of items per page.
- **Sorting** the data according to one column header (ascending or descending).
- **Filtering** with plain-text keywords (exact match if keywords are between double quotes).

## References

- [repository](https://github.com/SebDelile/react-datatable-generator)
- [npm package](https://www.npmjs.com/package/react-datatable-generator)
- [full documentation](https://sebdelile.github.io/react-datatable-generator/)

## Getting start

### Requierements

In order to use this plugin, you should have :

- Node v14.15.4 or later
- React v17.0.2 or later

### Installation

Run the following command:
`npm install react-datatable-generator`
or
`yarn add react-datatable-generator`

### Usage

import the component in your file by naming it whatever you want (it is the default and only one export of the package).
Then render it in your parent component with the 2 mandatory props **`headings`** and **`data`**. See the following paragraph for details about the shape of headings and data arrays.

```js
import Datatable from 'react-datatable-generator';
import {headings, data} from './your-files.js

const ParentComponent = ({}) => (
  <>
    <Datatable headings={headings} data={data} />
  </>
)
```

## API

The plugin can take 6 different props, only `headings` and `data` are mandatory.

```js
<Datatable
  headings={headings}
  data={data}
  className=''
  itemsPerPageOption={[10, 25, 50, 100]}
  isScrollable={false}
  customStyle={}
/>
```

### headings

`headings` contains the information to drive the building of the table. It must be an array of objects with the following shape :

```js
// example
headings = [
  { key: 'id', label: 'ID', type: 'number' },
  { key: 'name', label: 'name', type: 'string' },
  { key: 'job', label: 'job', type: 'string' },
  {
    key: 'dateOfBirth',
    label: 'Date of Birth',
    type: 'datestring',
    format: 'US-date',
  },
];
```

- **key** _{string}_: the column identifier to match the data with the column header. It must be unique among the `headings` array elements. it should not contain any whitespace or dash (as it is used as a key in data object)
- **label** _{string}_: the string being displayed in the column header of the table.
- **type** _{string}_: the type of data corresponding to this `key`. It is used to correctly sort the data with the sort feature. Accepted `type` are 'number', 'string' and 'datestring'. Any other `type` is considered as a string for sorting.
- **format** _{string}_: (optional) a function or keyword to transform data before being displayed in the table cell.
  - if `format` is a function : the data value is passed as parameter to this function and the returned result is diplayed in the table cell (value => foo(value)).
  - if `format` is a string : the data value is converted according to the keyword. Accepted keywords are 'US-date' (2021/08/24 => 08/24/2021) and 'US-currency' (12345.678 => $ 12,345.68).

## data

`data` contains the information to be displayed in the table body cells. It must be an array of objects. Each element of the `data` array leads to a row in the table.

```js
// example
data = [
  {
    id: 120,
    name: 'John Doe',
    job: 'Engineer',
    dateOfBirth: '1987-04-16',
  },
  {
    id: 34,
    name: 'Jane Smith',
    job: 'Doctor',
    dateOfBirth: '1987-09-23',
  },
  {
    id: 56,
    name: 'Arsène Lupin',
    job: 'Gentleman Thief',
    dateOfBirth: '1874-01-01',
  },
  {
    id: 78,
    name: 'Snow White',
    job: 'Princess',
    dateOfBirth: '1327-06-15',
  },
];
```

For each key of the `data` array elements matching a key property of the `headings` array, the corresponding value is displayed in the corresponding column (no matter the sequence in the `data array`).
If a `data` element has missing keys as compared to the keys of `headings` array, the table cell corresponding to this missing key is empty for this row.
If a `data` element has key-value pairs not corresponding to any key in `headings` array, these key-value pairs are simply ignored.

### className (optional)

A string of class names to be passed as props `className` of the plugin root component. It could be used to set positionning style rules (like `margin`, `self-align`, `grid-area`, ...). However please do not use it to modify the style of the inner elements of the plugin, prefer to use the customStyle props (see bellow).

```js
// example
const className = 'datatable datatable--right-align'; // default : ''
```

### itemsPerPageOption (optional)

An array of integers to customize the number of displayed items per page.

```js
// example
const itemsPerPageOption = [12, 24, 36, 48, 96]; // default : [10, 25, 50, 100]
```

### isScrollable (optional)

A boolean to chose between the two responsive modes in case the table is too large to be displayed in the container :

- if `true` : an horizontal scroll bar appears and allows reaching the last elements by scrolling to the right.
- if `false` : the columns that can not been displayed entierely are hidden so the table fit the container width. The missing column's informations are reachable by clicking on a row to expand an additional row.

```js
// example
const isScrollable = true; // default : false
```

### customStyle (optional)

An object containing style rules to overwrite the default styling of the plugin. the following rules are available for customization, any other rules is ignored. the `customStyle` object is merged in the `defaultStyle` object to overwrite properties, so there is no need to put style rules with default value in `customStyle`.

```js
// available styles rules and the corresponding default value
const defaultStyle = {
  // global, apply to each part of the plugin
  allPluginFontFamily: 'inherit',
  allPluginFontSize: 'inherit',
  allPluginFontWeight: undefined,
  allPluginColor: 'inherit',
  allPluginBackground: 'none',
  // table borders properties. Vertical = left + right, horizontal = top + bottom
  tableBodyVerticalBorder: undefined,
  tableBodyHorizontalBorder: '1px solid #000',
  tableHeadVerticalBorder: undefined,
  tableHeadHorizontalBorder: undefined,
  tableCellVerticalBorder: undefined,
  tableCellHorizontalBorder: '1px solid #DDD',
  moreInfoTableHorizontalBorder: '1px solid #EFEFEF',
  // table background color properties
  tableHeadBackground: '#FFF',
  tableBodyBackground: '#FFF',
  tableOddRowBackground: '#F7F7F7',
  tableSortedColumnBackground: '#FAFAFA',
  tableSortedColumnOddRowBackground: '#F1F1F1',
  tableHoveredRowBackground: '#F1F1F1',
  tableSortedColumnHoveredRowBackground: '#EAEAEA',
  moreInfoTableBackground: '#FFF',
  // table text properties
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
  // moreInfoTable text properties. More info is the additional expanded row in !isScrollable responsive mode
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
  // selectPage buttons properties
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
  // selectItemsPerPage properties
  selectItemsPerPageFontFamily: 'inherit',
  selectItemsPerPageFontSize: 'inherit',
  selectItemsPerPageFontWeight: undefined,
  selectItemsPerPageColor: 'inherit',
  selectItemsPerPageSelectBackground: undefined,
  selectItemsPerPageSelectColor: 'inherit',
  selectItemsPerPageSelectBorder: undefined,
  selectItemsPerPageSelectBorderRadius: undefined,
  // filter properties
  filterFontFamily: 'inherit',
  filterFontSize: 'inherit',
  filterFontWeight: undefined,
  filterColor: 'inherit',
  filterInputBackground: undefined,
  filterInputColor: 'inherit',
  filterInputBorder: undefined,
  filterInputBorderRadius: undefined,
  // showDisplayedItems properties
  showDisplayedItemsFontFamily: 'inherit',
  showDisplayedItemsFontSize: 'inherit',
  showDisplayedItemsFontWeight: undefined,
  showDisplayedItemsColor: 'inherit',
};
```

```js
// example
const customStyle = {
  allPluginColor: 'red',
  tableHeadHorizontalBorder: '1px solid #000',
  tableHeadBackground: undefined,
  tableBodyBackground: undefined,
};
```

**Important note :** the lenght passed to border or padding properties can only be in px or rem units. the use of other units will lead to unconsistant behavior. There is not such restriction for font-size properties.
