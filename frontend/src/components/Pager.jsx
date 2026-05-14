import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

export default function Pager({ pages, next, prev, fetchItems, api = null, }) {
  const [offset, setOffset] = useState(10);

  return(
    <div className="
      flex 
      items-center 
      rounded-xl
      overflow-hidden 
    ">
      <span 
        onClick={() => fetchItems(`${api}?page=1`)}
        className="
          bg-accent 
          text-background 
          py-[3px]
          leading-none
          cursor-pointer
          transition-all
          duration-300
          hover:bg-confirm-hover
      ">
        <FiChevronsLeft size={30} />
      </span>
      <span 
        onClick={() => fetchItems(prev)}
        className="
          bg-accent 
          text-background 
          px-1 
          py-2
          cursor-pointer
          transition-all
          duration-300
          hover:bg-confirm-hover
      ">
        <FaChevronLeft size={20} />
      </span>

      <nav className="flex text-xl">
        {pages.map((page, index) => (
          <a 
            key={index} 
            onClick={() => {
              fetchItems(`${api}?page=${page}`)
            }}
            className="leading-none px-2 py-2 hover:bg-active
          ">
            {page}
          </a>
        ))}
      </nav>

      <span 
        onClick={() => fetchItems(next)}
        className="
          bg-accent 
          text-background 
          px-1 
          py-2
          cursor-pointer
          transition-all
          duration-300
          hover:bg-confirm-hover
      ">
        <FaChevronRight size={20} />
      </span>
      <span 
        onClick={() => fetchItems(`${api}?page=last`)}
        className="
          bg-accent 
          text-background 
          py-[3px]
          leading-none
          cursor-pointer
          transition-all
          duration-300
          hover:bg-confirm-hover
      ">
        <FiChevronsRight size={30} />
      </span>
    </div>
  );
}