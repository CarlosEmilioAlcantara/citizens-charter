export default function Radiobox({
  items,
  selected,
  setValues,
}) {
  const rows = []
  for (let i = 0; i < items.length; i += 2) {
    rows.push(items.slice(i, i + 2));
  }

  return(
    <div className="flex flex-col gap-2">
      {rows.map((row, index) => (
        <div 
          key={index} 
          className="
            flex 
            gap-1 
            w-full 
            mb-2 
            justify-between
          "
        >
          {row.map(([key, value]) => (
            <>
              <input
                key={key}
                type="radio"
                name={value}
                value={value}
                className="w-4 h-4 accent-accent cursor-pointer"
                checked={(selected === value) || false}
                onChange={(e) => setValues(
                  value=>({...value, [name]:e.target.value})
                )}
              ></input>
              <label>{value}</label>
            </>
          ))}
        </div>
      ))}
    </div>
  )
}