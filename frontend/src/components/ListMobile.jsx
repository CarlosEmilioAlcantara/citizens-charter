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
        ${headers.length === 1 ? 'justify-end' : 'justify-center'}
        items-center 
        w-full 
        p-1
        border-b-2 
        border-b-unfocused 
        bg-popup-header
      `}>
        {headers.map((header, index) => (
          <span key={index}>{header}</span>
        ))}
      </div>

      <div className="h-[500px] flex flex-col gap-3 overflow-y-auto">
        {Object.entries(body).map(([key, data]) => (
          <div key={key} className="border-b border-b-unfocused">
            {Object.entries(data).map(([key, value]) => (
              <span key={key}>{value}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}