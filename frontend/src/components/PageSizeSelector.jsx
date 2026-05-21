import Dropdown from "./Dropdown";

export default function PageSizeSelector({ 
  label, 
  isOpen, 
  toggle, 
  setPageSize 
}) {
  return(
    <Dropdown 
      isOpen={isOpen}
      toggle={toggle}
      label={`${label} Rows`} 
      sizeSelector={true} 
      items={[
      {
        "name": "10 Rows",
        "function": () => {setPageSize(10)}
      },
      {
        "name": "20 Rows",
        "function": () => {setPageSize(20)}
      },
      {
        "name": "30 Rows",
        "function": () => {setPageSize(30)}
      },
      {
        "name": "40 Rows",
        "function": () => {setPageSize(40)}
      },
      {
        "name": "50 Rows",
        "function": () => {setPageSize(50)}
      },
      {
        "name": "60 Rows",
        "function": () => {setPageSize(60)}
      },
      {
        "name": "70 Rows",
        "function": () => {setPageSize(70)}
      },
      {
        "name": "80 Rows",
        "function": () => {setPageSize(80)}
      },
      {
        "name": "90 Rows",
        "function": () => {setPageSize(90)}
      },
      {
        "name": "100 Rows",
        "function": () => {setPageSize(100)}
      },
    ]}/>
  );
}