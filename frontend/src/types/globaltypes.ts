export interface ICustomer {
  name: string;
  email: string;
  address: string;
  status: boolean;
  joined_date: string;
}

export interface IAPIResponse<T> {
  data: T;
  hasNextPage: false;
  hasPreviousPage: false;
  message: "customers fetched successfully from cache";
  page: 1;
  status: 200;
  totalCount: 1962431;
  totalPages: 196244;
}
