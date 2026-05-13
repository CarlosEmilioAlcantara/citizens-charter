import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Pager({ pages, next, prev, fetchItems, }) {
  return(
    <div className="
    flex 
    items-center 
    gap-1 
    rounded-lg 
    overflow-hidden 
    text-2xl
  ">
      <span className="
        bg-accent 
        text-background 
        p-1 
        cursor-pointer
        transition-all
        duration-300
        hover:bg-confirm-hover
      ">
        <FaChevronLeft onClick={() => fetchItems(prev)}/>
      </span>

      <ul>
      </ul>

      <span className="
        bg-accent 
        text-background 
        p-1 
        cursor-pointer
        transition-all
        duration-300
        hover:bg-confirm-hover
      ">
        <FaChevronRight onClick={() => fetchItems(next)}/>
      </span>
    </div>
  );
}