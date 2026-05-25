import Dropdown from "../dropdowns/Dropdown";

export default function FilterSelector({ 
  label = "Filter", 
  isOpen, 
  toggle, 
  setFilter, 
  filters, 
}) {
  return(
    <Dropdown
      isOpen={isOpen}
      toggle={toggle}
      label={label}
      items={[
        {"label": "None", "function": () => setFilter("")},
        ...filters.map((filter) => ({
          "label": filter,
          "function": () => setFilter(filter)
        }))
      ]}
    />
  )
}