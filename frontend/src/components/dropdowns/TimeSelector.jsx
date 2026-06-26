import Dropdown from "./Dropdown";

export default function TimeSelector({ 
  timeFormat,
  setTimeFormat,
  name,
  value,
  setValue,
  isOpen,
  toggle, 
  setItems,
 }) {
  return(
    <div className="
      flex 
      pl-1
      border 
      border-foreground 
      rounded-sm 
      focus-within:ring-2
    focus-within:ring-accent/50
    ">
      <input 
        type="number"
        name={name}
        value={value}
        onChange={(e) => {
          if (setItems) {
            setValue(e.target.value);
          } else {
            setValue(value=>({...value, [name]:e.target.value}));
          }
        }}
        className="
          w-full
        text-foreground 
          text-md 
          md:text-xl
          focus:outline-none 
          active:outline-none
        "
      />
      <Dropdown 
        isOpen={isOpen}
        toggle={toggle}
        label={timeFormat}
        timeSelector={true}
        items={[
          {
            "label": "Seconds",
            "function": () => setTimeFormat("Seconds")
          },
          {
            "label": "Minutes",
            "function": () => setTimeFormat("Minutes")
          },
          {
            "label": "Hours",
            "function": () => setTimeFormat("Hours")
          },
          {
            "label": "Days",
            "function": () => setTimeFormat("Days")
          },
          {
            "label": "Weeks",
            "function": () => setTimeFormat("Weeks")
          },
          {
            "label": "Months",
            "function": () => setTimeFormat("Months")
          },
          {
            "label": "Years",
            "function": () => setTimeFormat("Years")
          },
        ]}
      /> 
    </div>
  );
}