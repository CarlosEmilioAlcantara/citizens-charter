import Dropdown from "./Dropdown";

export default function ActiveSelector({ 
  label, 
  isOpen, 
  toggle, 
  setValues,
}) {
  return(
    <Dropdown 
      isOpen={isOpen}
      toggle={toggle}
      label={label} 
      full={true}
      items={[
      {
        "label": "Active",
        "function": () => {setValues((prev) => ({
          ...prev, 
          is_active: true, 
        }))}
      },
      {
        "label": "Inactive",
        "function": () => {setValues((prev) => ({
          ...prev, 
          is_active: false, 
        }))}
      },
    ]}/>
  );
}