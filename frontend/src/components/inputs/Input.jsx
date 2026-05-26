import { FaEye, FaEyeSlash } from "react-icons/fa";
import useToggle from "../../hooks/useToggle";

export default function Input({
  label,
  warning, 
  type,
  placeholder, 
  name,
  value, 
  setValue,
  size,
  password = false,
}) {
  const [state, toggle] = useToggle(false);

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
        focus-within:ring-2
        focus-within:ring-accent/50
      ">
      <div className="flex gap-1">
        <label className="text-[8px] md:text-[10px]">{ label }</label>
        <label className="text-[8px] text-danger italic md:text-[10px]">
          { warning }
        </label>
      </div>

      <div className="flex items-center">
        <input
          type={state ? 'text' : type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={(e) => setValue(value=>({...value,[name]:e.target.value}))}
          className="
            w-full
          text-foreground 
            text-md 
            md:text-xl 
            focus:outline-none 
            active:outline-none
          "
        />

        {password && (
          state ? (
            <FaEye 
              onClick={toggle}
              className="
                cursor-pointer 
                transition-all 
                duration-300 
                hover:text-accent
            "/>
          ) : (
            <FaEyeSlash 
              onClick={toggle}
              className="
                cursor-pointer 
                transition-all 
                duration-300 
                hover:text-accent
            "/>
          )
        )}
      </div>
    </div>
  );
}