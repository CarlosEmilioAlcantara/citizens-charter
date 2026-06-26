import Listbox from "./Listbox";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function DualListbox({ 
  items, 
  selectedPositions, 
  setPositions,
  setSelectedPositions,
}) {
  return(
    <div className="flex items-center justify-between gap-3">
      <Listbox 
        items={items} 
        setPositions={setPositions}
        setSelectedPositions={setSelectedPositions} 
      />

      <div className="flex flex-col">
        <FaArrowLeft />
        <FaArrowRight />
      </div>

      <Listbox 
        items={selectedPositions} 
        setPositions={setPositions}
        setSelectedPositions={setSelectedPositions}
      />
    </div>
  );
}