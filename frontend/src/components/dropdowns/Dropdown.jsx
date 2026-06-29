import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Overlay from "../reusables/Overlay";

export default function Dropdown({ 
  isOpen,
  toggle,
  label = "Action", 
  disabled = false,
  sizeSelector = false, 
  sectorSelector = false,
  transactionSelector = false,
  timeSelector = false,
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
          ${disabled && 'pointer-events-none'}
      `}>
        <div 
          className={`
            ${(sizeSelector || timeSelector) && 'w-30'}
            ${transactionSelector && 'w-48'}
            ${sectorSelector && 'w-70'}
            ${full && 'w-full'}
            ${timeSelector && 'h-full'}
            relative
            flex
            ${(sectorSelector || transactionSelector) ? 
              'justify-start' : 
              'justify-center'
            }
            items-center
            gap-2
            px-2
            py-1
            rounded-sm
            ${disabled ? 
              'bg-unfocused border-unfocused' : 
              'bg-accent border-accent'
            }
            border
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
            ${((sizeSelector || transactionSelector) && !full) && 'w-md'}
            text-nowrap
          `}>
            {label}
          </span>
        </div>

        <div className={`
          absolute
          top-8
          ${sectorSelector ? 'right-[9px]' : 'right-0'}
          ${(sizeSelector || full || centerItems || transactionSelector) &&
             'w-full'
          }
          ${sectorSelector && 
            'w-70 h-[200px] overflow-auto'
          }
          ${timeSelector && 'w-full h-[97px] overflow-auto'}
          max-h-[400px]
          bg-background 
          border 
          border-accent
          rounded-sm
          ${isOpen ? 'opacity-100 z-20' : 'opacity-0 -z-10'}
          text-nowrap
          overflow-y-auto
          transition-all
          duration-300
          [&::-webkit-scrollbar]:w-1
          [&::-webkit-scrollbar]:h-1
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-track]:rounded-full
          [&::-webkit-scrollbar-thumb]:rounded-full
          hover:[&::-webkit-scrollbar-thumb]:bg-accent
        `}>
          <ul 
            className="flex flex-col overflow-hidden"
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
                  ${(sectorSelector || transactionSelector) && 'justify-start'}
                  ${selected === item.label && 'bg-active'}
                  ${isOpen && 'cursor-pointer'}
                  ${isOpen ? 'z-10' : '-z-10'}
                  transition-all 
                  duration-300
                  hover:bg-active
              `}>
                <button className="px-2 py-1 cursor-pointer wrap-break-word">
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