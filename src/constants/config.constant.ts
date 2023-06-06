import { MUIDataTableOptions, MUIDataTableTextLabels } from "mui-datatables";

export const DRAWER_WIDTH = 260;

export const GRID_SPACING = 3;

export const API_URL = import.meta.env.VITE_API_URL;

export const IS_DEV = process.env.NODE_ENV === 'development'

export const LIMIT = 10;

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

export const TABLE_LABEL: MUIDataTableTextLabels = {
  body: {
    noMatch: "ขออภัย, ไม่พบข้อมูล",
    toolTip: "เรียงลำดับ",
    columnHeaderTooltip: (column) => `เรียงลำดับสำหรับ ${column.label}`,
  },
  pagination: {
    next: "ถัดไป",
    previous: "ก่อนหน้า",
    rowsPerPage: "จำนวนต่อหน้า",
    displayRows: "จาก",
  },
  toolbar: {
    search: "ค้นหา",
    downloadCsv: "ดาวน์โหลด CSV",
    print: "พิมพ์",
    viewColumns: "ดูคอลัมน์",
    filterTable: "กรองตาราง",
  },
  filter: {
    all: "ทั้งหมด",
    title: "กรอง",
    reset: "ล้าง",
  },
  viewColumns: {
    title: "แสดงคอลัมน์",
    titleAria: "แสดง/ซ่อน คอลัมน์ตาราง",
  },
  selectedRows: {
    text: "แถวเลือกแล้ว",
    delete: "ลบ",
    deleteAria: "ลบแถวที่เลือกแล้ว",
  },
};
