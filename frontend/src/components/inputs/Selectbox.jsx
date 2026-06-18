import { useEffect, useState } from "react";
import useToggle from "../../hooks/useToggle";

export default function Selectbox({
  items,
  selected,
  setSelected,
  classification = false,
}) {
  const [state, toggle] = useToggle(false);
  const entries = Object.entries(items);
  const rows = [];

  for (let i = 0; i < entries.length; i += 2) {
    rows.push(entries.slice(i, i + 2));
  }

  return(
    <div className="flex flex-col gap">
      {classification && 
        rows.map((row, index) => (
          <div 
            key={index} 
            className="
              flex 
              gap-1 
              w-full 
              mb-2 
            "
          >
            {row.map(([key, value]) => (
              <span 
                key={key} 
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
                <label>{
                  value === "g2b" ?
                    "G2B - Government to Business" :
                  value === "g2c" ?
                    "G2C - Government to Client" :
                  value === "g2e" ?
                    "G2E - Government to Employee" :
                  value === "g2g" &&
                    "G2G - Government to Government"
                }</label>
              </span>
            ))}
          </div>
        ))
      ||
      items?.map((value, index) => (
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