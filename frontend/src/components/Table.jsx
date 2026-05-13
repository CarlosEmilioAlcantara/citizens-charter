import { useEffect, useState } from "react";
import Pager from "./Pager";

export default function Table({ 
  headers, 
  body, 
  count = null,
  next = null,
  prev = null,
  fetchItems = null,
  api = null,
  hideID = false,
}) {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const number = count / 10;
    for(let i = 1; i < number; i++) {
      setPages(prevPages => [...prevPages, i]);
    }
  }, [body])
  
  return (
    <>
      <div className="rounded-t-lg overflow-hidden">
        <table className="table-fixed w-full">
          <thead className="table table-fixed w-full border-b-2 border-b-unfocused bg-popup-header">
            {headers.length === 2 ? (
              <tr>
                <th key={headers[0].index} className="py-1">{headers[0]}</th>
                <th key={headers[1].index} className="pr-[45px] py-1 text-right">
                  {headers[1]}
                </th>
              </tr>
            ) : (
              <tr>
                {headers.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            )}
          </thead>

          <tbody className="
            block 
            w-full 
            h-[500px] 
            overflow-y-auto 
            [&::-webkit-scrollbar]:w-1
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-track]:rounded-full
            [&::-webkit-scrollbar-thumb]:rounded-full
          hover:[&::-webkit-scrollbar-thumb]:bg-accent
          ">
            {Object.entries(body).map(([key, data]) => (
              <tr key={key} className="table table-fixed w-full text-md border-b border-b-unfocused">
                {/* {Object.keys(data).length === 3 ? ( */}
                {Object.keys(data).length === 4 ? (
                  hideID && Object.keys(data)[0] == "id" ? (
                    <>
                      <td 
                        key={Object.keys(data)[0]}
                        className="hidden" 
                      >
                        {Object.values(data)[0]}
                      </td>
                      <td key={Object.keys(data)[1]} className="px-6 py-2">
                        {Object.values(data)[1]}
                      </td>
                      <td 
                        key={Object.keys(data)[3]} 
                        className="flex justify-end px-6 py-2"
                      >
                        {Object.values(data)[3]}
                      </td>
                    </>
                  ) : (
                    <>
                      <td 
                        key={Object.keys(data)[0]}
                        className="px-6 py-2" 
                      >
                        {Object.values(data)[0]}
                      </td>
                      <td key={Object.keys(data)[1]} className="px-6 py-2">
                        {Object.values(data)[1]}
                      </td>
                      <td 
                        key={Object.keys(data)[3]}
                        className="flex justify-end px-6 py-2"
                      >
                        {Object.values(data)[3]}
                      </td>
                    </>
                  )
                ) : (
                  Object.entries(data).map(([key, value]) => (
                    hideID && key == "id" || key == "pdf" ? (
                    // hideID && key == "id" ? (
                      <td className="hidden" key={key}>{value}</td>
                    ) : (
                      <td className="px-6 py-2" key={key}>{value}</td>
                    )
                  ))
                )}
              </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <div className="
        flex 
        flex-col 
        justify-between 
        items-center 
        p-3 
        gap-3
        md:flex-row
      ">
        {count && (
          <p className="text-xs text-unfocused md:flex-1">
            Showing 10 out of {count} entries
          </p>
        )}

        <Pager pages={pages} next={next} prev={prev} fetchItems={fetchItems} api={api}/>
      </div>
    </>
  );
}