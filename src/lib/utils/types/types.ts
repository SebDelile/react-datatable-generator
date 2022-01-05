import { StyleInterface } from './StyleInterface';

export type ReducerActionType = { type: string; payload?: any };

export type DispatchType = { dispatch: React.Dispatch<ReducerActionType> };

export type SortType = {
  key: string | null;
  direction: 1 | -1;
  type: string | undefined;
};

export interface StoreStateInterface {
  headings: HeadingsElementInterface[];
  data: DataElementInterface[] | [];
  itemsPerPageOption: number[];
  isScrollable: boolean;
  filterKeyword: string;
  currentSort: SortType;
  itemsPerPage: number;
  currentPage: number;
  moreInfoOpenList: string[];
  filteredData: DataElementInterface[];
  sortedData: DataElementInterface[];
  displayedData: DataElementInterface[];
  width: number;
  columnsMinWidth: number[];
  displayedColumns: number;
  style: StyleInterface;
}

export type ContextType = StoreStateInterface & DispatchType;

export interface HeadingsElementInterface {
  key: string;
  label: string;
  type: string;
  format?: string | ((data: string | number | boolean) => string);
}

export interface DataElementInterface {
  [Key: string]: boolean | number | string;
}
