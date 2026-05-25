import Dropdown from "../dropdowns/Dropdown";
import { isTablet } from "../../utils/isTablet";
import useWindowWidth from "../../utils/useWindowWidth";

export default function PageSizeSelector({ 
  label, 
  isOpen, 
  toggle, 
  setPageSize,
}) {
  const [windowWidth] = useWindowWidth();

  return(
    <Dropdown 
      isOpen={isOpen}
      toggle={toggle}
      label={`${label} Rows`} 
      sizeSelector={true} 
      full={!isTablet(windowWidth)}
      items={[
      {
        "label": "10 Rows",
        "function": () => {setPageSize(10)}
      },
      {
        "label": "20 Rows",
        "function": () => {setPageSize(20)}
      },
      {
        "label": "30 Rows",
        "function": () => {setPageSize(30)}
      },
      {
        "label": "40 Rows",
        "function": () => {setPageSize(40)}
      },
      {
        "label": "50 Rows",
        "function": () => {setPageSize(50)}
      },
      {
        "label": "60 Rows",
        "function": () => {setPageSize(60)}
      },
      {
        "label": "70 Rows",
        "function": () => {setPageSize(70)}
      },
      {
        "label": "80 Rows",
        "function": () => {setPageSize(80)}
      },
      {
        "label": "90 Rows",
        "function": () => {setPageSize(90)}
      },
      {
        "label": "100 Rows",
        "function": () => {setPageSize(100)}
      },
    ]}/>
  );
}