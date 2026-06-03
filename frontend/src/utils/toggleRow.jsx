export const toggleRow = (setSelectedRows, itemIDs, id) => {
  setSelectedRows((prev) => {
    const prevRows = {...prev}
    if (prevRows[id]) { 
      delete prevRows[id] 
    } else if (itemIDs.includes(id)) { 
      prevRows[id] = true 
    };
    return prevRows;
  })
}