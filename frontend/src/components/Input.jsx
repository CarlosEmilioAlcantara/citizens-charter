import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Input({
  label, 
  type,
  placeholder, 
  name,
  value, 
  setValue,
  size,
}) {
  return (
    <div 
      className="
        flex 
        flex-col 
        w-full
        p-2
        border 
        border-foreground 
        rounded-sm
      ">
      <label className="text-[8px] md:text-[10px]">{ label }</label>

      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={(e) => setValue(value=>({...value,[name]:e.target.value}))}
        className="text-md md:text-xl focus:outline-none active:outline-none"
      />
    </div>
  );
}