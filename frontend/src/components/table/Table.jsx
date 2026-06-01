import Pager from "../table_controls/Pager";

export default function Table({ 
  headers, 
  body, 
  hideID = false, 
  charterList = false,
  sectorList = false,
}) {
  const renderHeaders = () => {
    if (charterList) {
      return (
        <tr>
          <th className="p-1 pl-[24px] text-left">
            {headers[0]}
          </th>

          <th className="p-1 text-left">
            {headers[1]}
          </th>

          <th className="p-1 pr-[24px] text-right">
            {headers[2]}
          </th>
        </tr>
      );
    }

    if (sectorList) {
      return (
        <tr>
          <th className="w-px">
            {headers[0]}
          </th>

          <th className="w-[86px] p-1 pl-[25px] text-left">
            {headers[1]}
          </th>

          <th className="p-1 text-left">
            {headers[2]}
          </th>

          <th className="p-1 pr-[24px] text-right">
            {headers[3]}
          </th>
        </tr>
      );
    }

    return (
      <tr>
        {headers.map((header, index) => (
          <th 
            key={index} 
            className="p-1 text-center"
          >
            {header}
          </th>
        ))}
      </tr>
    );
  };

  const renderRow = (data) => {
    if (charterList) {
      return (
        <>
          <td className="p-1 pl-[24px]">
            {Object.values(data)[1]}
          </td>

          <td className="p-1">
            {Object.values(data)[4]}
          </td>

          <td className="p-1">
            <div className="flex justify-end">
              {Object.values(data)[5]}
            </div>
          </td>
        </>
      );
    }

    if (sectorList) {
      return (
        <>
          <td className="w-[24px] align-middle text-center">
            {/* {String(Object.values(data)[1]).replace(/\.0$/, "")} */}
            {Object.values(data)[0]}
          </td>

          <td className="w-[64px] p-1">
            {Object.values(data)[2]}
          </td>

          <td className="p-1">
            {Object.values(data)[3]}
          </td>

          <td className="p-1 pr-[72px]">
            <div className="flex justify-end">
              {Object.values(data)[4]}
            </div>
          </td>
        </>
      );
    }

    return Object.entries(data).map(([key, value]) => {
      if (hideID && key === "id") {
        return (
          <td key={key} className="hidden">
            {value}
          </td>
        );
      }

      return (
        <td 
          key={key}
          className="p-1 text-center wrap-break-word"
        >
          {String(value).replace(/\.0$/, "")}
        </td>
      );
    });
  };

  return (
    <div className="rounded-t-lg overflow-hidden">
      <table className="
        w-full
        table-fixed
        text-sm
        border-collapse
      ">
        <thead className="
          bg-popup-header
          border-b-2
          border-b-unfocused
        ">
          {renderHeaders()}
        </thead>
      </table>

      <div className="
        h-[500px]
        overflow-y-auto
        [&::-webkit-scrollbar]:w-1
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-thumb]:rounded-full
        hover:[&::-webkit-scrollbar-thumb]:bg-accent
      ">
        <table className="
          w-full
          table-fixed
          text-sm
          border-collapse
        ">
          <tbody>
            {Object.entries(body).map(([key, data]) => (
              <tr
                key={key}
                className="
                  border-b
                  border-b-unfocused
                  align-top
                "
              >
                {renderRow(data)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}