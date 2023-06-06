import { deleteProduct, getProducts } from "@/apis/products.api";
import MUIDataTableExtended from "@/components/MUIDataTableExtended";
import { TABLE_LABEL, TABLE_OPTIONS } from "@/constants/config.constant";
import useDataTable from "@/hooks/useDataTable";
import { getKeyFromColumns } from "@/utils/filter.util";
import { Delete, Visibility } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  LinearProgress,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { MUIDataTableColumn } from "mui-datatables";
import { productDetailPageUrl } from "./detail";
import { formatDateTime } from "@/utils/format-date.util";
import useConfirm from "@/hooks/useConfirm";

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
  const { isLoading, data, refetch } = useQuery({
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
    useErrorBoundary: true,
  });
  const { confirm, confirmSuccess, confirmError } = useConfirm();
  const deleteMutation = useMutation({
    mutationKey: ["deleteProduct"],
    mutationFn: deleteProduct,
    onSuccess: () => {
      refetch();
      confirmSuccess({});
    },
    onError: () => {
      confirmError({});
    },
  });

  const handleShowConfirmDelete = (productId: string) => {
    confirm({
      onConfirm: () => handleConfirmDeleteProduct(productId),
      message: `ยืนยันการลบสินค้าหมายเลข #${productId}`,
      confirmButtonProps: {
        color: "error",
      },
    });
  };

  const handleConfirmDeleteProduct = (productId: string) => {
    deleteMutation.mutate(productId);
  };

  const columns: MUIDataTableColumn[] = [
    {
      name: "id",
      label: "หมายเลข",
      options: {
        filter: false,
        sort: false,
      },
    },
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
        setCellProps: () => ({
          style: { maxWidth: "500px" },
        }),
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
        setCellProps: () => ({ style: { minWidth: "150px" } }),
        customBodyRender: (createdAt) => {
          return formatDateTime(new Date(createdAt));
        },
      },
    },
    {
      name: "id",
      label: " ",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (productId) => {
          return (
            <Box display="flex" gap={1}>
              <IconButton size="small" href={productDetailPageUrl(productId)}>
                <Visibility color="primary" />
              </IconButton>
              <Divider orientation="vertical" flexItem />
              <IconButton
                title="ลบ"
                size="small"
                onClick={() => handleShowConfirmDelete(productId)}
                disabled={deleteMutation.isLoading}
              >
                {deleteMutation.variables === productId &&
                deleteMutation.isLoading ? (
                  <CircularProgress size={16} color="error" />
                ) : (
                  <Delete color="error" />
                )}
              </IconButton>
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
