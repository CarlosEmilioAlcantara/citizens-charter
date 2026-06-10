import { changeValue } from "../../utils/changeValue";

export default function TextArea({ 
  rowkey, 
  field, 
  value, 
  selectedRows = null, 
  data = null,
  setItems = null,
}) {
  return(
    <textarea
      disabled={selectedRows && !selectedRows[data.id]}
      key={`${rowkey}-${field}`}
      value={value}
      onChange={(e) => changeValue(e, setItems, rowkey, field )}
      className={`
        w-[98%] 
        p-2 
        border 
        border-foreground 
        rounded-sm
        transition-all
        duration-300
        ${selectedRows && selectedRows[data.id] ? 
            'bg-background' : 
            'bg-popup-header'
        }
      `}
    />
  );
}