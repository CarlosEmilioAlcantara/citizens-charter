export default function Table({ headers, body, hideID = false }) {
  return (
    <div className="w-[98%] rounded-lg overflow-hidden">
      <table className="min-w-full table-auto">
        <thead className="bg-unfocused">
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

        <tbody>
          {Object.entries(body).map(([key, data]) => (
            <tr key={key} className="text-md border-b border-b-unfocused">
              {Object.keys(data).length === 3 ? (
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
                      key={Object.keys(data)[2]} 
                      className="flex justify-end px-6 py-2"
                    >
                      {Object.values(data)[2]}
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
                      key={Object.keys(data)[2]}
                      className="flex justify-end px-6 py-2"
                    >
                      {Object.values(data)[2]}
                    </td>
                  </>
                )
              ) : (
                Object.entries(data).map(([key, value]) => (
                  hideID && key == "id" ? (
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
  );
}