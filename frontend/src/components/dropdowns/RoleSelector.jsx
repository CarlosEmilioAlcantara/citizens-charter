import Dropdown from "../dropdowns/Dropdown";

export default function RoleSelector({ 
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
        "label": "User",
        "function": () => {setValues((prev) => ({
          ...prev, 
          is_staff: false,
          is_superuser: false,
        }))}
      },
      {
        "label": "Admin",
        "function": () => {setValues((prev) => ({
          ...prev, 
          is_staff: true,
          is_superuser: false,
        }))}
      },
      {
        "label": "Superadmin",
        "function": () => {setValues((prev) => ({
          ...prev, 
          is_staff: true,
          is_superuser: true,
        }))}
      },
    ]}/>
  );
}