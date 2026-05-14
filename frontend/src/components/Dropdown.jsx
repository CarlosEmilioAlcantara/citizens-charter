import { FaChevronDown } from "react-icons/fa";
import useToggle from "../utils/useToggle";

export default function Dropdown({ label = "Action", small = false, items }) {
  const [state, toggle] = useToggle(false);

  return(
    <div className="relative flex flex-col items-center gap-1">
      <div 
        onClick={toggle}
        className={`
          ${small && 'w-20'}
          relative
          flex
          justify-center
          items-center 
          gap-2
          px-2
          py-1
          rounded-sm
          bg-accent 
          border
          border-accent
          text-background 
          text-md
          cursor-pointer
          transition-all
          duration-300
          hover:bg-confirm-hover
      `}>
        <span className="flex justify-center shrink-0">
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
        <span className="flex truncate">{label}</span>
      </div>

      <div className={`
        ${small && 'w-full'}
        absolute
        top-8
        right-0
        bg-background 
        border 
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
                flex
                ${small ? 'justify-center' : 'justify-end'}
                ${state ? 'cursor-pointer' : ''}
                ${state ? 'z-10' : '-z-10'}
                transition-all 
                duration-300
                hover:bg-active
            `}>
              <button 
                value={item.name}
                onClick={item.function}
                className="px-2 py-1 cursor-pointer text-right"
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}