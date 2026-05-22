export default function ListMobile({ 
  headers, 
  body, 
  hideID = false, 
  charterList = false 
}) {
  return(
    <div className="rounded-t-lg overflow-y-hidden">
      <div className={`
        flex 
        ${headers.length === 1 ? 'justify-end' : 
          headers.length <= 3 ? 'justify-between' : 'justify-center'
        }
        items-center 
        gap-3
        w-full 
        px-2
        py-1
        border-b-2 
        border-b-unfocused 
        bg-popup-header
      `}>
        {headers.map((header, index) => (
          <span key={index}>{header}</span>
        ))}
      </div>

      <div className="h-[400px] overflow-y-auto">
        {Object.entries(body).map(([key, data]) => (
          <div key={key} className="p-2 border-b border-b-unfocused">
            {Object.keys(data).length === 2 && (
              hideID && Object.keys(data)[0] === "id" ? (
                <>
                  <span key={Object.keys(data)[1]}>
                    {Object.values(data)[1]}
                  </span>
                  <span key={Object.keys(data)[2]}>
                    {Object.values(data)[2]}
                  </span>
                </>
              ) : (
                <>
                  <span key={Object.keys(data)[0]}>
                    {Object.values(data)[0]}
                  </span>
                  <span key={Object.keys(data)[1]}>
                    {Object.values(data)[1]}
                  </span>
                  <span key={Object.keys(data)[2]}>
                    {Object.values(data)[2]}
                  </span>
                </>
              )
            ) || charterList && (
                <>
                  <span key={Object.keys(data)[1]}>
                    {Object.values(data)[1]}
                  </span>
                  <span key={Object.keys(data)[4]}>
                    {Object.values(data)[4]}
                  </span>
                </>
            ) || (
              Object.entries(data).map(([key, value]) => (
                <span key={key}>{value}</span>
              ))
            )}
          </div>
        ))}
      </div>
    </div>
  );
}