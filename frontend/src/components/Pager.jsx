import { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

export default function Pager({ count, next, prev, fetchItems, route }) {
  const [pages, setPages] = useState([]);
  const currentPage = useRef(1);
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
        onClick={() => {
          fetchItems(`${route}?page=1`);
          currentPage.current = 1;
        }}
        className={`
          ${currentPage.current === 1 ? 
            'bg-unfocused text-foreground pointer-events-none' : 
            'bg-accent text-background'
          }
          py-px
          leading-none
          cursor-pointer
          transition-all
          duration-300
          hover:bg-confirm-hover
      `}>
        <FiChevronsLeft size={34} />
      </span>
      <span 
        onClick={() => {
          fetchItems(prev); 
          currentPage.current = Number(prev.match(/page=(\d+)/)?.pop()) || 
            1;
        }}
        className={`
          ${currentPage.current === 1 ? 
            'bg-unfocused text-foreground pointer-events-none' : 
            'bg-accent text-background'
          }
          px-1 
          py-2
          cursor-pointer
          transition-all
          duration-300
          hover:bg-confirm-hover
      `}>
        <FaChevronLeft size={20} />
      </span>

      <nav className="flex text-xl">
        {pages.map((page, index) => (
          <a 
            key={index} 
            onClick={() => {
              fetchItems(`${route}?page=${page}`);
              currentPage.current = page;
            }}
            className={`
              leading-none 
              p-2
              ${currentPage.current === page && 'bg-active'}
              cursor-pointer 
              transition-all
              duration-300
              hover:bg-active
          `}>
            {page}
          </a>
        ))}
      </nav>

      <span 
        onClick={() => {
          fetchItems(next);
          currentPage.current = Number(next.match(/page=(\d+)/).pop()) || 
            number;
        }}
        className={`
          ${currentPage.current === number ? 
            'bg-unfocused text-foreground pointer-events-none' : 
            'bg-accent text-background'
          }
          bg-accent 
          text-background 
          px-1 
          py-2
          cursor-pointer
          transition-all
          duration-300
          hover:bg-confirm-hover
      `}>
        <FaChevronRight size={20} />
      </span>
      <span 
        onClick={() => {
          fetchItems(`${route}?page=last`);
          currentPage.current = number
        }}
        className={`
          ${currentPage.current === number ? 
            'bg-unfocused text-foreground pointer-events-none' : 
            'bg-accent text-background'
          }
          py-px
          leading-none
          cursor-pointer
          transition-all
          duration-300
          hover:bg-confirm-hover
      `}>
        <FiChevronsRight size={34} />
      </span>
    </div>
  );
}