import useToggle from "../../utils/useToggle";
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";

export default function TableHeader({ 
  label, 
  order, 
  setOrdering, 
  onClick 
}) {
  const [state, toggle] = useToggle(true);

  const addOrder = (ordering, order, nextState) => {
    const labels = ordering ? ordering.split(",") : [];
    const filtered = labels.filter(
      label => label !== order && label !== `-${order}`
    );

    filtered.push(nextState ? order : `-${order}`);
    return filtered.join(",");
  }

  const handleClick = () => {
    onClick();
    toggle();
    setOrdering(prev => addOrder(prev, order, !state));
  }

  return(
    <span 
      onClick={handleClick}
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