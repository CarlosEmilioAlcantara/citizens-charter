import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Pager({ pages, next, prev, fetchItems, api = null, }) {
  const [offset, setOffset] = useState(10);

  return(
    <div className="
      flex 
      items-center 
      rounded-lg 
      overflow-hidden 
    ">
      <span 
        onClick={() => fetchItems(prev)}
        className="
          bg-accent 
          text-background 
          px-1 
          py-2
          text-xl
          cursor-pointer
          transition-all
          duration-300
          hover:bg-confirm-hover
      ">
        <FaChevronLeft />
      </span>

      <nav className="flex text-xl">
        {pages.map((page, index) => (
          <a 
            key={index} 
            onClick={() => {
              fetchItems(`${api}?offset=${index !== 0 && (offset + 10)}`)
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
          text-xl
          cursor-pointer
          transition-all
          duration-300
          hover:bg-confirm-hover
      ">
        <FaChevronRight />
      </span>
    </div>
  );
}