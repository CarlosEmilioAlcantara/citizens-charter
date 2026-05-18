import { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

export default function Pager({ 
  count, 
  next, 
  prev, 
  fetchItems, 
  route, 
  pageSize,
  currentPage,
  setCurrentPage, 
}) {
  const [pages, setPages] = useState([]);
  const number = Math.ceil(count / pageSize);

  useEffect(() => {
    setPages(Array.from({ length: number }, (_, i) => i + 1));
  }, [count, pageSize]);

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
          setCurrentPage(1);
        }}
        className={`
          ${currentPage === 1 ? 
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
          setCurrentPage(Number(prev.match(/page=(\d+)/)?.pop()) || 1);
        }}
        className={`
          ${currentPage === 1 ? 
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
              setCurrentPage(page);
            }}
            className={`
              leading-none 
              p-2
              ${currentPage === page && 'bg-active'}
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
          setCurrentPage(Number(next.match(/page=(\d+)/).pop()) || number);
        }}
        className={`
          ${currentPage === number ? 
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
          setCurrentPage(number);
        }}
        className={`
          ${currentPage === number ? 
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