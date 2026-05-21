import { FaSearch } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6"

export default function Search({ placeholder, value, setValue, onClick }) {
  return(
    <div 
      onClick={onClick}
      className="
        flex
        items-center
        gap-2
        w-full
        py-1
        px-2
        border
        border-foreground
        rounded-sm
        focus-within:ring-2
        focus-within:ring-accent/50
        z-10
    ">
      <FaSearch />
      <input 
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="
          w-full 
          text-foreground 
          text-md 
          focus:outline-none 
          active:outline-none
        "
      />
      {value && 
        <FaXmark 
          onClick={() => setValue("")} 
          className="
            cursor-pointer 
            transition-all 
            duration-300 
            hover:text-accent
        "/>
      }
    </div>
  )
}