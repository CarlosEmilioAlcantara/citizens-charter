import Dropdown from "../dropdowns/Dropdown";

export default function TransactionSelector({ 
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
      transactionSelector={true}
      items={[
      {
        "label": "Simple",
        "function": () => {setValues((prev) => ({
          ...prev, 
          transaction: "simple",
        }))}
      },
      {
        "label": "Komplikado",
        "function": () => {setValues((prev) => ({
          ...prev, 
          transaction: "complicated",
        }))}
      },
      {
        "label": "Lubhang Teknikal",
        "function": () => {setValues((prev) => ({
          ...prev, 
          transaction: "technical",
        }))}
      },
    ]}/>
  );
}