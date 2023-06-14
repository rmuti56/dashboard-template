import { deleteProduct, getProducts } from "@/apis/product.api";
import MUIDataTableExtended from "@/components/MUIDataTableExtended";
import { TABLE_OPTIONS } from "@/constants/config.constant";
import useDataTable from "@/hooks/useDataTable";
import { getKeyFromColumns } from "@/utils/filter.util";
import { DeleteOutline, Visibility } from "@mui/icons-material";
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
import { QueryKey } from "@/enums/query-key.enum";
import { MutationKey } from "@/enums/mutation-key.enum";

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
      QueryKey.PRODUCTS,
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
    select: (products) =>
      products.map((product) => {
        return {
          ...product,
          name: `${product.name} 123`,
        };
      }),
    useErrorBoundary: true,
  });
  const { confirm, confirmSuccess, confirmError } = useConfirm();
  const deleteMutation = useMutation({
    mutationKey: [MutationKey.DELETE_PRODUCT],
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
      message: `Confirm to remove product id #${productId}`,
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
      label: "ID",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "name",
      label: "Name",
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
      label: "Description",
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
      label: "Price",
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
      label: "Created At",
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
                  <DeleteOutline color="error" />
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
          body: {
            noMatch: isLoading ? <LinearProgress /> : "Can not found the data",
          },
        },
        confirmFilters: true,
        customFilterDialogFooter: (_, applyNewFilters) => {
          return (
            <Box mt={3}>
              <Button
                variant="contained"
                onClick={() => {
                  const filterList: [] = applyNewFilters?.() ?? [];
                  handleFilter(filterList, keyFromColumns);
                }}
              >
                Apply
              </Button>
            </Box>
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
