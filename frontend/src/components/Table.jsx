import Pager from "./Pager";

export default function Table({ 
  headers, 
  body, 
  hideID = false, 
  charterList = false,
}) {
  return (
    <div className="rounded-t-lg overflow-hidden">
      <table className="table-fixed w-full">
        <thead className="
          table 
          table-fixed 
          w-full 
          border-b-2 
          border-b-unfocused 
          bg-popup-header
        ">
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
            <tr key={key} className="
              table 
              table-fixed 
              w-full 
              text-md 
              border-b 
              border-b-unfocused
            ">
              {/* {Object.keys(data).length === 3 ? ( */}
              {Object.keys(data).length === 2 && (
                hideID && Object.keys(data)[0] == "id" ? (
                  <>
                    <td key={Object.keys(data)[0]} className="hidden">
                      {Object.values(data)[0]}
                    </td>
                    <td 
                      key={Object.keys(data)[1]} 
                      className="flex justify-end px-6 p-[6px]"
                    >
                      {Object.values(data)[1]}
                    </td>
                  </>
                ) : (
                  <>
                    <td key={Object.keys(data)[0]} className="px-6 p-[6px]">
                      {Object.values(data)[0]}
                    </td>
                    <td 
                      key={Object.keys(data)[1]}
                      className="flex justify-end px-6 p-[6px]"
                    >
                      {Object.values(data)[1]}
                    </td>
                  </>
                )
              ) || charterList && (
                <>
                  <td key={Object.keys(data)[0]} className="hidden">
                    {Object.values(data)[0]}
                  </td>
                  <td key={Object.keys(data)[1]} className="px-6 p-[6px]">
                    {Object.values(data)[1]}
                  </td>
                  <td key={Object.keys(data)[2]} className="hidden">
                    {Object.values(data)[2]}
                  </td>
                  <td key={Object.keys(data)[3]} className="hidden">
                    {Object.values(data)[3]}
                  </td>
                  <td 
                    key={Object.keys(data)[4]} 
                    className="flex justify-end px-6 p-[6px]"
                  >
                    {Object.values(data)[4]}
                  </td>
                </>
              ) || (
                Object.entries(data).map(([key, value]) => (
                  hideID && key == "id" || key == "pdf" ? (
                  // hideID && key == "id" ? (
                    <td className="hidden" key={key}>{value}</td>
                  ) : (
                    <td className="px-6 p-[6px]" key={key}>{value}</td>
                  )
                ))
              )}
            </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}