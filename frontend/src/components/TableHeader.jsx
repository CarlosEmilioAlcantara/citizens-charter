import { useEffect } from "react";
import useToggle from "../utils/useToggle";
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";

export default function TableHeader({ label, order, setOrder, onClick }) {
  const [state, toggle] = useToggle(true);

  useEffect(() => {
    setOrder(
      state ? order.replace("-", "") : `-${order.replace("-", "")}`
    )
  }, [state, order, setOrder]);

  return(
    <span 
      onClick={() => {onClick(); toggle();}}
      className="relative inline-flex items-center cursor-pointer z-10"
    >
      <span className="font-bold">{label}</span>
      <span className="flex -space-x-[8px]">
        <FaLongArrowAltDown className={`
          ${state ? 'text-foreground' : 'text-unfocused'}
          transition-all
          duration-300
        `}/>
        <FaLongArrowAltUp className={`
          ${state ? 'text-unfocused' : 'text-foreground'}
          transition-all
          duration-300
        `}/>
      </span>
    </span>
  );
}