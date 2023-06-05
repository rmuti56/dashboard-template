import { LIMIT } from "@/constants/config.constant";
import {
  DynamicFilter,
  KeyFromColumns,
  SortDirection,
} from "@/types/criteria-request.type";
import { getFilterRequest } from "@/utils/filter.util";
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
  const [filter, setFilter] = useState<DynamicFilter>({});

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

  const handleFilter = (
    filterList: string[][],
    keyFromColumns: KeyFromColumns
  ) => {
    const filter = getFilterRequest(filterList, keyFromColumns);
    setFilter(filter);
    setCurrentPage(0);
  };

  const debouncedFilter = debounce(handleFilter, 100);

  return {
    currentPage,
    pageSize,
    search,
    sortBy,
    order,
    filter,
    handlePageChange,
    handlePageSizeChange,
    handleSearch: debouncedSearch,
    handleSort,
    handleFilter: debouncedFilter,
  };
};

export default useDataTable;
