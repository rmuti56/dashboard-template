import { getProducts } from "@/apis/products.api";
import MUIDataTableExtended from "@/components/MUIDataTableExtended";
import { TABLE_LABEL, TABLE_OPTIONS } from "@/constants/config.constant";
import useDataTable from "@/hooks/useDataTable";
import { getKeyFromColumns } from "@/utils/filter.util";
import { Visibility } from "@mui/icons-material";
import { Box, Button, LinearProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { MUIDataTableColumn } from "mui-datatables";
import { productDetailPageUrl } from "./detail";

const ProductsPage = () => {
  const {
    currentPage,
    pageSize,
    search,
    sortBy,
    order,
    filter,
    handlePageChange,
    handlePageSizeChange,
    handleSearch,
    handleSort,
    handleFilter,
  } = useDataTable();
  const { isLoading, data } = useQuery({
    queryKey: [
      "products",
      {
        page: currentPage + 1,
        limit: pageSize,
        search,
        sortBy,
        order,
        ...filter,
      },
    ],
    queryFn: getProducts,
  });

  const columns: MUIDataTableColumn[] = [
    {
      name: "name",
      label: "ชื่อ",
      options: {
        filter: true,
        sort: true,
        searchable: true,
        customFilterListOptions: { render: (v) => `Name: ${v}` },
        filterOptions: {
          fullWidth: true,
          names: ["computer", "b", "c", "d"],
          renderValue: (value) => {
            return `${value} ei ei`;
          },
        },
      },
    },
    {
      name: "description",
      label: "คำอธิบาย",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "price",
      label: "ราคา",
      options: {
        filter: true,
        sort: false,
        filterType: "multiselect",
        filterOptions: {
          fullWidth: true,
        },
      },
    },
    {
      name: "createdAt",
      label: "สร้างเมื่อ",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "id",
      label: " ",
      options: {
        customBodyRender: (productId) => {
          return (
            <Box>
              <Button size="small" href={productDetailPageUrl(productId)}>
                <Visibility />
              </Button>
            </Box>
          );
        },
      },
    },
  ];

  const keyFromColumns = getKeyFromColumns(columns);

  return (
    <MUIDataTableExtended
      title=""
      data={data || []}
      columns={columns}
      options={{
        ...TABLE_OPTIONS,
        page: currentPage,
        // TODO: use response from API
        count: 50,
        textLabels: {
          ...TABLE_LABEL,
          body: {
            ...TABLE_LABEL.body,
            noMatch: isLoading ? <LinearProgress /> : "ไม่พบข้อมูล",
          },
        },
        confirmFilters: true,
        customFilterDialogFooter: (_, applyNewFilters) => {
          return (
            <div style={{ marginTop: "40px" }}>
              <Button
                variant="contained"
                onClick={() => {
                  const filterList: [] = applyNewFilters?.() ?? [];
                  handleFilter(filterList, keyFromColumns);
                }}
              >
                ปรับใช้
              </Button>
            </div>
          );
        },
        onChangePage: handlePageChange,
        onChangeRowsPerPage: handlePageSizeChange,
        onSearchChange: handleSearch,
        onColumnSortChange: handleSort,
        onFilterChange: (_, filterList, type) => {
          if (type === "chip") {
            handleFilter(filterList, keyFromColumns);
          }
        },
      }}
    />
  );
};

export default ProductsPage;
