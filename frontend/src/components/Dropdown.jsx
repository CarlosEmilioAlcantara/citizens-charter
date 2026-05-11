import { FaChevronDown } from "react-icons/fa";
import useToggle from "../utils/useToggle";

export default function Dropdown({ items }) {
  const [state, toggle] = useToggle(false);

  return(
    <div className="relative flex flex-col items-center gap-1">
      <div 
        onClick={toggle}
        className="
          w-28
          flex 
          items-center 
          gap-2
          px-2
          py-1
          rounded-sm
          bg-accent 
          text-background 
          text-md
          cursor-pointer
          transition-all
          duration-300
          hover:bg-confirm-hover
      ">
        <span>
          {state ? (
            <FaChevronDown 
              size={24} 
              className="scale-y-[-1] transition-all duration-300"
            />
          ) : (
            <FaChevronDown 
              size={24}
              className="transition-all duration-300"
            />
          )}
        </span>
        <span>Aksyon</span>
      </div>

      <div className={`
        absolute
        top-8
        right-0
        bg-background border 
        border-accent
        rounded-sm
        ${state ? 'opacity-100 z-10' : 'opacity-0 -z-10'}
        transition-all
        duration-300
      `}>
        <ul 
          className="flex flex-col"
        >
          {items.map((item, index) => (
            <li 
              key={index}
              className={`
                w-full 
                px-2 
                py-1 
                ${state ? 'cursor-pointer' : ''}
                ${state ? 'z-10' : '-z-10'}
                transition-all 
                duration-300
                hover:bg-active
            `}>
              <input 
                type="button" 
                value={item.name} 
                 onClick={item.function}
                 className="w-full cursor-pointer text-right"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}