import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

export default function Pager({ count, next, prev, fetchItems, route }) {
  const [pages, setPages] = useState([]);
  const number = Math.ceil(count / 10);

  useEffect(() => {
    setPages(Array.from({ length: number }, (_, i) => i + 1));
  }, [count]);

  return(
    <div className="
      flex 
      items-center 
      rounded-xl
      overflow-hidden 
    ">
      <span 
        onClick={() => fetchItems(`${route}?page=1`)}
        className="
          bg-accent 
          text-background 
          py-px
          leading-none
          cursor-pointer
          transition-all
          duration-300
          hover:bg-confirm-hover
      ">
        <FiChevronsLeft size={34} />
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
              fetchItems(`${route}?page=${page}`)
            }}
            className="
              leading-none 
              px-2 
              py-2 
              cursor-pointer 
              transition-all
              duration-300
              hover:bg-active
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
        onClick={() => fetchItems(`${route}?page=last`)}
        className="
          bg-accent 
          text-background 
          py-px
          leading-none
          cursor-pointer
          transition-all
          duration-300
          hover:bg-confirm-hover
      ">
        <FiChevronsRight size={34} />
      </span>
    </div>
  );
}