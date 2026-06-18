export default function InputArea({ 
  label,
  warning,
  placeholder,
  name,
  value,
  setValue,
  small = false,
}) {
  return(
    <div 
      className="
        flex 
        flex-col 
        w-full
        p-1
        border 
        border-foreground 
        rounded-sm
        focus-within:ring-2
        focus-within:ring-accent/50
      ">
      <div className="flex gap-1">
        <label className="text-[8px] md:text-[10px]">{ label }</label>
        <label className="text-[8px] text-danger italic md:text-[10px]">
          { 
            (warning?.[0]?.charAt(0).toUpperCase() + warning?.[0]?.slice(1)) ||
              "" 
          }
        </label>
      </div>

      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(value=>({...value, [name]:e.target.value}))}
        className="
          border-foreground 
          rounded-sm
          transition-all
          duration-300
          focus:outline-none 
          active:outline-none
          [&::-webkit-scrollbar]:w-1
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-track]:rounded-full
          [&::-webkit-scrollbar-thumb]:rounded-full
          hover:[&::-webkit-scrollbar-thumb]:bg-unfocused
        "
        rows={small ? 2 : 5}
      />
    </div>
  );
}