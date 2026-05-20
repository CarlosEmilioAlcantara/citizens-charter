import { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

export default function Pager({ 
  count, 
  next, 
  prev, 
  search,
  pageSize,
  fetchItems, 
  route, 
  currentPage,
  setCurrentPage, 
}) {
  const totalPages = Math.ceil(count / pageSize);

  const getPages = (currentPage, totalPages) => {
    if (totalPages === 1 || totalPages === 0) {
      setCurrentPage(1);
      return [1];
    }

    const pages = [];
    const firstPage = 1;
    const lastPage = totalPages;
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

  console.log(totalPages);
  return(
    <div className="
      flex 
      items-center 
      rounded-xl
      overflow-hidden 
    ">
      <span 
        onClick={() => {
          fetchItems(`${route}?page=1&search=${search}&page_size=${pageSize}`);
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
        {getPages(currentPage, totalPages).map((page, index) => (
          <a 
            key={index} 
            onClick={() => {
              if (!isNaN(page)) {
                fetchItems(`${route}?page=${page}&search=${search}&page_size=${pageSize}`);
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
          setCurrentPage(Number(next.match(/page=(\d+)/).pop()) || totalPages);
        }}
        className={`
          ${currentPage === totalPages || totalPages === 0 ? 
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
          fetchItems(
            `${route}?page=last&search=${search}&page_size=${pageSize}`
          );
          setCurrentPage(totalPages);
        }}
        className={`
          ${currentPage === totalPages || totalPages === 0 ? 
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