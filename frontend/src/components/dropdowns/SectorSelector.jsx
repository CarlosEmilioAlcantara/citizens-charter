import Dropdown from "./Dropdown";
import { isTablet } from "../../utils/isTablet";
import useWindowWidth from "../../hooks/useWindowWidth";

export default function SectorSelector({ 
  label = "",
  rowkey,
  sectors,
  isOpen,
  toggle, 
  setItems,
  changeSector,
}) {
  const [windowWidth] = useWindowWidth();

  return(
    <Dropdown
      isOpen={isOpen}
      toggle={toggle}
      label={label}
      full={!isTablet(windowWidth)}
      items={[
        ...sectors.map((sector) => ({
          "label": sector.name,
          "function": () => changeSector(sector, setItems, rowkey),
        }))
      ]}
    />
  );
}