import { FaSearch } from "react-icons/fa";

export default function Search({ placeholder, value, setValue }) {
  return(
    <div className="
      flex
      items-center
      gap-2
      w-full
      p-1
      border
      border-foreground
      rounded-sm
      focus-within:ring-2
      focus-within:ring-accent/50
    ">
      <FaSearch />
      <input 
        type="text"
        placeholder={placeholder}
        value={value}
        className="w-full text-foreground text-md md:text-lg focus:outline-none active:outline-none"
      />
    </div>
  )
}