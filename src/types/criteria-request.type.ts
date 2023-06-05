export type SortDirection = "asc" | "desc";

export type CriteriaRequest = {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  order?: SortDirection;
};
