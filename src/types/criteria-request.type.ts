export type SortDirection = "asc" | "desc";

export type CriteriaRequest = {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  order?: SortDirection;
};

export type DynamicFilter = {
  [key: string]: string | string[];
};

export type KeyFromColumns = {
  [key: number]: string;
};

export type FilterList = string[][];
