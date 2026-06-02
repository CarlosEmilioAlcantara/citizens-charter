import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Overlay from "../reusables/Overlay";

export default function Dropdown({ 
  isOpen,
  toggle,
  label = "Action", 
  sizeSelector = false, 
  centerItems = false,
  full = false,
  items,
}) {
  const [selected, setSelected] = useState("");

  return(
    <>
      <Overlay 
        show={isOpen} 
        toggle={toggle}
        transparent={true} 
      />
      <div 
        onClick={toggle} 
        className={`
          relative 
          ${full && 'w-full'}
          flex 
          flex-col 
          items-center 
          gap-1
      `}>
        <div 
          className={`
            ${sizeSelector && 'w-30'}
            ${full && 'w-full'}
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
            z-10
            hover:bg-confirm-hover
        `}>
          <span className="w-[24px]">
            {isOpen ? (
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
          <span className={`
            ${(sizeSelector && !full) && 'w-md'}
            text-nowrap
          `}>
            {label}
          </span>
        </div>

        <div className={`
          ${(sizeSelector || full || centerItems) && 'w-full'}
          absolute
          top-8
          right-0
          bg-background 
          border 
          border-accent
          rounded-sm
          ${isOpen ? 'opacity-100 z-20' : 'opacity-0 -z-10'}
          text-nowrap
          transition-all
          duration-300
        `}>
          <ul 
            className="flex flex-col"
          >
            {items.map((item, index) => (
              <li 
                key={index}
                onClick={() => {item.function(); setSelected(item.label)}}
                className={`
                  flex
                  ${(sizeSelector || full || centerItems) ? 
                    'justify-center' : 'justify-end'
                  }
                  ${selected === item.label && 'bg-active'}
                  ${isOpen ? 'cursor-pointer' : ''}
                  ${isOpen ? 'z-10' : '-z-10'
                  }
                  transition-all 
                  duration-300
                  hover:bg-active
              `}>
                <button className="px-2 py-1 cursor-pointer text-right">
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}