import Pager from "../table_controls/Pager";

export default function Table({ 
  headers, 
  body, 
  hideID = false, 
  charterList = false,
  sectorList = false,
  officeList = false,
  userList = false,
  charterAudit = false,
  serviceList = false,
  stepList = false,
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

          <th className="p-1 text-center">
            {headers[3]}
          </th>

          <th className="p-1 pr-[72px] text-right">
            {headers[4]}
          </th>
        </tr>
      );
    }

    if (officeList) {
      return (
        <tr>
          {headers.map((header, index) => (
            index === 0 ? (
              <th 
                key={index} 
                className="p-1 pl-[52px] text-center"
              >
                {header}
              </th>
            ) : index === 1 ? (
              <th 
                key={index} 
                className="p-1 pl-[38px] text-center"
              >
                {header}
              </th>
            ) : index === 2 ? (
              <th 
                key={index} 
                className="p-1 pl-[24px] text-center"
              >
                {header}
              </th>
            ) : index === 3 ? (
              <th 
                key={index} 
                className="p-1 pr-[82px] text-end"
              >
                {header}
              </th>
            ) : (
              <th 
                key={index} 
                className="p-1 text-center"
              >
                {header}
              </th>
            )
          ))}
        </tr>
      )
    }

    if (userList) {
      return (
        <tr>
          {headers.map((header, index) => (
            index === 0 ? (
              <th 
                key={index} 
                className="p-1 text-center"
              >
                {header}
              </th>
            ) : index === 1 ? (
              <th 
                key={index} 
                className="p-1 pr-[22px] text-center"
              >
                {header}
              </th>
            ) : index === 2 ? (
              <th 
                key={index} 
                className="p-1 w-[146px]"
              >
                {header}
              </th>
            ) : (
              <th 
                key={index} 
                className="p-1 text-center"
              >
                {header}
              </th>
            )
          ))}
        </tr>
      );
    }

    if (charterAudit) {
      return (
        <tr>
          {headers.map((header, index) => (
            <th 
              key={index} 
              className={`
                ${index === 0 && 'w-[168px] pl-[24px]'}
                ${index === 1 && 'pr-[178px] xl:w-[128px] xl:pr-[32px]'}
                ${index === 2 && 'pr-[152px] lg:w-[358px] lg:pl-[94px] xl:pr-0 '}
                ${index === 3 && 'pl-[98px] xl:pl-[184px]'}
                ${index === 4 && 'pl-[32px] xl:pl-[54px]'}
                p-1 
                ${(index !== 0 && index !== 1) && 'text-center'}
              `}
            >
              {header}
            </th>
          ))}
        </tr>
      )
    }

    if (serviceList) {
      return (
        <tr>
          {headers.map((header, index) => (
            <th 
              key={index} 
              className={`p-1
                ${index === 0 && 'w-[24px] pl-[24px]'}
                ${(index === 1 || index === 2) && 
                    'pl-[86px]'
                }
                ${index === 3 && 'pr-[15px] text-end'}
                ${index === 5 && 'pr-[32px] text-end'}
                ${index === 6 && 'w-[124px] pr-[30px] text-end'}
              `}
            >
              {header}
            </th>
          ))}
        </tr>
      )
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
          <td className="p-1 pl-[24px] align-middle">
            {Object.values(data)[1]}
          </td>

          <td className="p-1 align-middle">
            {Object.values(data)[4]}
          </td>

          <td className="p-1 align-middle">
            <div className="flex justify-end">
              {Object.values(data)[5]}
            </div>
          </td>
        </>
      );
    }

    if (sectorList) {
      return Object.entries(data).map(([field, value]) => {
        if (field === "id") {
          return (
            <td key={field} className="hidden">
              {value}
            </td>
          );
        }

        const isCheckboxColumn = field === "checkbox"
        const isNumberColumn = field === "number"
        const isNameColumn = field === "name"

        return (
          field !== "office_names" ? (
            <td 
              key={field}
              className={`p-1 align-middle 
                ${isCheckboxColumn ? 
                    'w-[24px] text-center' :
                  isNumberColumn ?
                    'w-[64px] pl-4 align-middle text-left' :
                  isNameColumn ?
                    'text-center' :
                    'text-center wrap-break-word'
                }
              `}
            >
              {value}
            </td>
          ) : (
            <td key={field} className="p-1 align-middle">
              <div className="flex justify-end">
                {value}
              </div>
            </td>
          )
        );
      });
    }

    if (charterAudit) {
      return Object.entries(data).map(([key, value]) => {
        if (key === "id") {
          return (
            <td key={key} className="hidden">
              {value}
            </td>
          );
        }

        const isCheckboxColumn = key === "checkbox"
        const isContentTypeModel = key === "content_type_model"
        const isActionName = key === "action_name"
        const isChanges = key === "changes"

        return (
          value !== null && (
            <td 
              key={key}
              className={`p-1 align-middle 
                ${isCheckboxColumn ? 
                    'w-[24px] text-center' :
                  isContentTypeModel || isActionName ?
                    'w-[124px] text-center' :
                  isChanges ?
                    'w-[500px]' :
                    'text-center wrap-break-word'
                }
              `}
            >
              {value}
            </td>
          )
        );
      });
    }

    if (serviceList) {
      return Object.entries(data).map(([key, value]) => {
        if (key === "id") {
          return (
            <td key={key} className="hidden">
              {value}
            </td>
          );
        }

        const isNumberColumn = key === "number"
        const isTransactionColumn = key === "formatted_transaction"
        const isClassificationColumn = key === "formatted_classification_types"
        const isSubserivceColumn = key === "is_subservice"
        const isActionColumn = key === "actions"

        return (
          value !== null && (
            <td 
              key={key}
              className={`p-1 align-middle 
                  ${isNumberColumn ?
                      'w-[76px] text-center' :
                    isTransactionColumn ?
                      'text-center' :
                    isClassificationColumn ?
                      'pr-[52px] text-center' :
                    isSubserivceColumn ?
                      'hidden' :
                    isActionColumn ?
                      'w-[108px] text-end' :
                      ''
                  }
                }
              `}
            >
              {value}
            </td>
          )
        );
      });
    }

    if (stepList) {
      return Object.entries(data).map(([key, value]) => {
        if (hideID && key === "id") {
          return (
            <td key={key} className="hidden">
              {value}
            </td>
          );
        }

        const isCheckboxColumn = key === "checkbox"
        const isSubactionColumn = key === "is_subaction"
        const isServiceColumn = key === "service"
        const isPositionColumn = key === "position"

        return (
          value !== null && (
            <td 
              key={key}
              className={`p-1 align-middle 
                ${isCheckboxColumn ? 
                    'w-[24px] text-center' : 
                  (isSubactionColumn || isServiceColumn || isPositionColumn) &&
                    'hidden'
                }
              `}
            >
              {value}
            </td>
          )
        );
      });
    }

    return Object.entries(data).map(([key, value]) => {
      if (hideID && key === "id") {
        return (
          <td key={key} className="hidden">
            {value}
          </td>
        );
      }

      const isCheckboxColumn = key === "checkbox"
      const isActionColumn = key === "actions"
      const isEmployeeNames = key === "employee_names"

      return (
        value !== null && (
          <td 
            key={key}
            className={`p-1 align-middle 
              ${isCheckboxColumn ? 
                  'w-[24px] text-center' : 
                isActionColumn && userList ?
                  'w-[164px]' :
                isActionColumn ?
                  '' :
                  'p-1 text-center wrap-break-word'
              }
            `}
          >
            {isActionColumn || isEmployeeNames ? (
              <div className="flex justify-end">
                {value}
              </div>
            ) : value }
          </td>
        )
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
            {Object.entries(body).map(([key, rowData]) => (
              <tr
                key={key}
                className="
                  border-b
                  border-b-unfocused
                  align-top
                "
              >
                {renderRow(rowData)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}