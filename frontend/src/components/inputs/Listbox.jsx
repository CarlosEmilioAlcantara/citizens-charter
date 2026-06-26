import { useEffect, useState } from "react";

export default function Listbox({ 
  items, 
  prevSelected = null, 
  setPositions = null,
  setSelectedPositions = null,
}) {
  const [selected, setSelected] = useState("");

  useEffect(() => {
    if (prevSelected) { setSelected(prevSelected) };
  }, [prevSelected])

  return(
    <div className="
      w-full
      h-[300px]
      bg-background 
      border 
      border-accent
      rounded-sm
      overflow-auto
      [&::-webkit-scrollbar]:w-1
      [&::-webkit-scrollbar]:h-1
      [&::-webkit-scrollbar-track]:bg-transparent
      [&::-webkit-scrollbar-track]:rounded-full
      [&::-webkit-scrollbar-thumb]:rounded-full
      hover:[&::-webkit-scrollbar-thumb]:bg-accent
    ">
      <ul className="w-full overflow-hidden">
        {[...items]
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((item, index) => (
            <li 
              key={index}
              onClick={() => {
                if (setSelectedPositions) {
                  setSelectedPositions((prev) =>
                    prev.includes(item) ?
                      prev.filter((position) => position !== item) :
                    [...prev, item]
                  );
                  setPositions((prev) =>
                    prev.includes(item) ?
                      prev.filter((position) => position !== item) :
                    [...prev, item]
                  );
                } else {
                  item.onClick(); 
                  setSelected(item.name);
                }
              }}
              className={`
                block
                w-full
                ${selected === item.name && 'bg-active'}
                px-2
                py-1
                wrap-break-word
                cursor-pointer
                transition-all 
                duration-300
                hover:bg-active
            `}>
              {item.name}
            </li>
        ))}
      </ul>
    </div>
  );
}