import { changeValue } from "../../utils/changeValue";

export default function TextArea({ 
  rowkey, 
  field, 
  value, 
  selectedRows, 
  data,
  setItems,
}) {
  return(
    <textarea
      disabled={!selectedRows[data.id]}
      key={`${rowkey}-${field}`}
      value={value}
      onChange={(e) => changeValue(e, setItems, rowkey, field)}
      className={`
        w-[98%] 
        p-2 
        border 
        border-foreground 
        rounded-sm
        transition-all
        duration-300
        ${selectedRows[data.id] ? 'bg-background' : 'bg-popup-header'}
      `}
    />
  );
}