export const toggleRow = (setSelectedRows, id) => {
  setSelectedRows((prev) => {
    const prevRows = {...prev}
    if (prevRows[id]) { delete prevRows[id] } else { prevRows[id] = true };
    return prevRows;
  })
}