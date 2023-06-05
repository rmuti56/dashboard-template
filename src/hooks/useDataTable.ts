import { LIMIT } from "@/constants/config.constant";
import { SortDirection } from "@/types/criteria-request.type";
import { debounce } from "@mui/material";
import { useState } from "react";

interface UseDataTableProps {
  searchDebounceDelay?: number;
}

const useDataTable = (
  { searchDebounceDelay }: UseDataTableProps = {
    searchDebounceDelay: 500,
  }
) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(LIMIT);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState<SortDirection>("asc");

  const handlePageChange = (currentPage: number) => {
    setCurrentPage(currentPage);
  };

  const handlePageSizeChange = (pageSize: number) => {
    setPageSize(pageSize);
  };

  const handleSearch = (search: string | null) => {
    setSearch(search || "");
    setCurrentPage(0);
  };

  const debouncedSearch = debounce(handleSearch, searchDebounceDelay);

  const handleSort = (sortBy: string, order: SortDirection) => {
    setSortBy(sortBy);
    setOrder(order);
  };

  return {
    currentPage,
    pageSize,
    search,
    sortBy,
    order,
    handlePageChange,
    handlePageSizeChange,
    handleSearch: debouncedSearch,
    handleSort,
  };
};

export default useDataTable;
