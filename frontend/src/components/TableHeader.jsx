import { useEffect } from "react";
import useToggle from "../utils/useToggle";
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";

export default function TableHeader({ label, order, setOrder }) {
  const [state, toggle] = useToggle(true);

  useEffect(() => {
    setOrder(
      state ? order.replace("-", "") : `-${order.replace("-", "")}`
    )
  }, [state]);

  return(
    <span className="inline-flex items-center">
      <span className="font-bold">{label}</span>
      <span onClick={toggle} className="flex -space-x-[8px] cursor-pointer">
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