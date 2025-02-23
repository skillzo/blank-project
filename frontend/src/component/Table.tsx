import { ICustomer } from "../types/globaltypes";

export const Table = ({ data }: any) => {
  const headers = Object.keys(data[0]);

  return (
    <table border={1} cellPadding="10" cellSpacing="0">
      <thead className="thead-dark">
        <tr>
          {headers.map((key, index) => (
            <th key={index}>{key}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((item: ICustomer) => (
          <tr key={item.email}>
            {headers.map((key, index) => (
              <td key={index}>
                {item[key as keyof ICustomer] === true
                  ? "Active"
                  : item[key as keyof ICustomer]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
