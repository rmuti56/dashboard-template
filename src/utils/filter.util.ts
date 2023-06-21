import {
  DynamicFilter,
  FilterList,
  KeyFromColumns,
} from "@/types/criteria-request.type";
import { MUIDataTableColumn } from "mui-datatables";

export const getKeyFromColumns = (
  columns: MUIDataTableColumn[]
): KeyFromColumns => {
  return columns.reduce<KeyFromColumns>((previous, current, currentIndex) => {
    previous[currentIndex] = current.name;
    return previous;
  }, {});
};

export const getFilterRequest = (
  filterList: FilterList,
  keyFromColumns: KeyFromColumns
): DynamicFilter => {
  return filterList.reduce<DynamicFilter>((previous, current, currentIndex) => {
    previous[keyFromColumns[currentIndex]] = current;
    return previous;
  }, {});
};
