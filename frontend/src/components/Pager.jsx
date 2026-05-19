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
  // const [pages, setPages] = useState([]);
  const [halfwayPages, setHalfwayPages] = useState([]);
  const number = Math.ceil(count / pageSize);
  const between = Math.floor(number / 2);

  const getPages = (currentPage, number) => {
    if (number === 1) {
      return [1];
    }

    const pages = [];
    const firstPage = 1;
    const lastPage = number;
    const prevPage = currentPage - 1;
    const nextPage = currentPage + 1;

    pages.push(firstPage);

    if (Math.abs(firstPage - prevPage) > 1) {
      pages.push("...");
    }

    if (firstPage < prevPage) {
      pages.push(prevPage);
    }

    if (currentPage !== firstPage && currentPage !== lastPage) {
      pages.push(currentPage);
    }

    if (nextPage < lastPage) {
      pages.push(nextPage);
    }

    if (Math.abs(nextPage - lastPage) > 1) {
      pages.push("...");
    }

    pages.push(lastPage);

    return pages;
  };

  // useEffect(() => {
  //   setPages(Array.from({ length: number }, (_, i) => i + 1));
  //   setHalfwayPages(Array.from({ length: number - 4}, (_, i) => i + 4));
  // }, [count, pageSize]);

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
        {/* {pages.map((page, index) => {
          const showEllipsis =
            Object.values(halfwayPages).includes(index + 1) && 
              (index + 1);
            
          const previousWasHidden =
            Object.values(halfwayPages).includes(index);

          if (showEllipsis) {
            if (previousWasHidden) return null;

            return (
              <a
                key={index}
                className={`
                  leading-none 
                  p-2
                  ${currentPage === page && 'bg-active'}
                  cursor-pointer 
                  transition-all
                  duration-300
                  hover:bg-active
              `}>
                ...    
              </a>
            );
          }

          return (
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
          );
        })} */}
        {getPages(currentPage, number).map((page, index) => (
          <a 
            key={index} 
            onClick={() => {
              if (!isNaN(page)) {
                fetchItems(`${route}?page=${page}`);
                setCurrentPage(page);
              }
            }}
            style={isNaN(page) ? { pointerEvents: "none" }: {}}
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