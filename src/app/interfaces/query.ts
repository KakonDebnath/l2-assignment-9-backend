export type TQueryObj = {
  [key: string]: unknown;
  page?: string;
  limit?: string;
  search?: string;
  fields?: string;
  sortBy?: string;
  sortOrder?: string;
};
