import Button from "./Button"

export default function ButtonGroup({ items }) {
  return(
    items.map((item, index) => (
      <Button 
        key={index} 
        label={item.label} 
        icon={item.icon} 
        onClick={item.function} 
      />
    ))
  )
}