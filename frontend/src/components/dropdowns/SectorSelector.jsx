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
  disabled = false,
}) {
  const [windowWidth] = useWindowWidth();

  return(
    <Dropdown
      isOpen={isOpen}
      toggle={toggle}
      label={label}
      disabled={disabled}
      full={!isTablet(windowWidth)}
      sectorSelector={true}
      items={[
        ...sectors.map((sector) => ({
          "label": sector.name,
          "function": () => changeSector(sector, setItems, rowkey),
        }))
      ]}
    />
  );
}