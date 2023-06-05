import { MUIDataTableOptions } from "mui-datatables";

export const DRAWER_WIDTH = 260;

export const GRID_SPACING = 3;

export const API_URL = import.meta.env.VITE_API_URL;

export const LIMIT = 20;

export const SEARCH_DEBOUNCE = 500;

export const TABLE_OPTIONS: MUIDataTableOptions = {
  filter: true,
  search: true,
  filterType: "dropdown",
  responsive: "standard",
  serverSide: true,
  rowsPerPage: LIMIT,
  rowsPerPageOptions: [10, 20, 30, 40],
  download: false,
  print: false,
  confirmFilters: true,
  selectableRowsHideCheckboxes: true,
};
