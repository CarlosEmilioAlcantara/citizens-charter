import useToggle from "../../hooks/useToggle"

export default function OptionTicker({
  label, 
  value,
  setValue,
}) {
  const [state, toggle] = useToggle(false);

  return(
    <span className="flex items-center gap-2 p-2">
      <input
        type="checkbox"
        name={value}
        className="w-4 h-4 accent-accent cursor-pointer"
        checked={state}
        onChange={() => {
          toggle();
          setValue((prev) => ({
            ...prev,
            [value]: !state,
          }))
        }}
      ></input>
      <label>{label}</label>
    </span>
  );
}