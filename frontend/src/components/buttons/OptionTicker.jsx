export default function OptionTicker({
  label, 
  name,
  value,
  setValue,
}) {
  return(
    <span className="flex items-center gap-2 p-2">
      <input
        type="checkbox"
        name={name}
        className="w-4 h-4 accent-accent cursor-pointer"
        checked={value}
        onChange={() => {
          setValue((prev) => ({
            ...prev,
            [name]: !value,
          }))
        }}
      ></input>
      <label>{label}</label>
    </span>
  );
}