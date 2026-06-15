import useToggle from "../../hooks/useToggle";
export default function Selectbox({
  items,
  selected,
  setSelected,
}) {
  const [state, toggle] = useToggle(false);

  return(
    <div className="flex flex-col gap-2">
      {items?.map((value, index) => (
        <span 
          key={index} 
          className="flex gap-2 items-center justify-start"
        >
          <input
            type="checkbox"
            name={value}
            className="w-4 h-4 accent-accent cursor-pointer"
            checked={selected.includes(value) || false}
            onChange={() => {
              setSelected((prev) => 
                prev.includes(value) ? 
                  prev.filter((item) => item !== value) :
                  [...prev, value]
                );
            }}
          ></input>
          <label>{value}</label>
        </span>
      ))}

      <span 
        className="flex gap-2 items-center justify-start"
      >
        <input
          type="checkbox"
          name={"All"}
          className="w-4 h-4 accent-accent cursor-pointer"
          onChange={() => {
            toggle(); 
            !state ? setSelected(items) : setSelected([])
          }}
        ></input>
        <label>Lahat</label>
      </span>
    </div>
  )
}