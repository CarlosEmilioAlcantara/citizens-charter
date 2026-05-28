import Button from "./Button"

export default function ButtonGroup({ buttons }) {
  const rows = [];
  for (let i = 0; i < buttons.length; i += 2) {
    rows.push(buttons.slice(i, i + 2));
  }

  return(
    <div className="flex flex-col gap-1">
      {rows.map((row, index) => (
        <div key={index} className="flex gap-1 w-full justify-between md:flex-col">
          {row.map((button, index) => (
            <span key={index} className="w-1/2 md:w-full">{button}</span>
          ))}
        </div>
      ))}
    </div>
  )
}