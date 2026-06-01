export const toggleRow = (setSelectedRows, id) => {
  setSelectedRows((prev) => ({
    ...prev,
    [id]: !prev[id]
  }))
}