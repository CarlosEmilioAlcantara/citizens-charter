import { toggleRow } from "../../utils/toggleRow";
export default function Checkbox({ selectedRows, setSelectedRows, data }) {
  return(
    <input 
      type="checkbox"
      className="w-4 h-4 accent-accent cursor-pointer"
      checked={selectedRows[data.id] || false}
      onChange={() => toggleRow(setSelectedRows, data.id)}
    ></input>
  );
}