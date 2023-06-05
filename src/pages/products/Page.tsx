import { getProducts } from "@/apis/products.api";
import MUIDataTableExtended from "@/components/MUIDataTableExtended";
import { TABLE_OPTIONS } from "@/constants/config.constant";
import useDataTable from "@/hooks/useDataTable";
import { LinearProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { MUIDataTableColumn } from "mui-datatables";

const ProductsPage = () => {
  const {
    currentPage,
    pageSize,
    search,
    sortBy,
    order,
    handlePageChange,
    handlePageSizeChange,
    handleSearch,
    handleSort,
  } = useDataTable();
  const { isLoading, data } = useQuery({
    queryKey: [
      "products",
      { page: currentPage + 1, limit: pageSize, search, sortBy, order },
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
  ];

  return (
    <MUIDataTableExtended
      title=""
      data={data || []}
      columns={columns}
      options={{
        ...TABLE_OPTIONS,
        page: currentPage,
        count: 50,
        textLabels: {
          body: {
            noMatch: isLoading ? <LinearProgress /> : "ไม่พบข้อมูล",
          },
        },
        onChangePage: handlePageChange,
        onChangeRowsPerPage: handlePageSizeChange,
        onSearchChange: handleSearch,
        onColumnSortChange: handleSort,
      }}
    />
  );
};

export default ProductsPage;
