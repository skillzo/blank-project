import { ChangeEvent, useEffect, useState } from "react";
import "./App.css";
import { Table } from "./component/Table";
import { IAPIResponse, ICustomer } from "./types/globaltypes";
import { useDebounce } from "./hooks/useDebounce";

const person = {
  name: "skillzo",
  age: 26,
};

const base_url = import.meta.env.VITE_BASE_URL;
function App() {
  const [data, setData] = useState<IAPIResponse<ICustomer[]> | null>(null);
  const [pagination, setPagination] = useState({ page: 1, page_size: 10 });

  const debouncedPage = useDebounce(String(pagination.page), 500);
  const debouncedPageSize = useDebounce(String(pagination.page_size), 500);

  useEffect(() => {
    fetch(
      `${base_url}/customers/getall?page=${pagination.page}&page_size=${pagination.page_size}`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, [debouncedPage, debouncedPageSize]);

  return (
    <div className="container">
      {data && <h1>{data?.message}</h1>}
      {data?.data && <Table data={data?.data} />}

      <div
        style={{
          marginTop: "20px",
        }}
      >
        <input
          type="text"
          placeholder="page"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setPagination({
              ...pagination,
              page: Number(event.target.value),
            });
          }}
        />

        <input
          type="text"
          placeholder="page size"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setPagination({
              ...pagination,
              page_size: Number(event.target.value),
            });
          }}
        />
      </div>
    </div>
  );
}

export default App;
