import Dropdown from "../dropdowns/Dropdown";
import { isTablet } from "../../utils/isTablet";
import useWindowWidth from "../../hooks/useWindowWidth";

export default function FilterSelector({ 
  label = "Filter", 
  isOpen, 
  toggle, 
  setFilter, 
  filters, 
}) {
  const [windowWidth] = useWindowWidth();

  return(
    <Dropdown
      isOpen={isOpen}
      toggle={toggle}
      label={label}
      full={!isTablet(windowWidth)}
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