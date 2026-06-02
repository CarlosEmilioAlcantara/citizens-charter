import Dropdown from "../dropdowns/Dropdown";
import { isTablet } from "../../utils/isTablet";
import useWindowWidth from "../../hooks/useWindowWidth";

export default function FilterSelector({ 
  label = "Filter", 
  isOpen, 
  toggle, 
  setFilter, 
  filters, 
  centerItems = false,
}) {
  const [windowWidth] = useWindowWidth();

  return(
    <Dropdown
      isOpen={isOpen}
      toggle={toggle}
      label={label}
      centerItems={centerItems}
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