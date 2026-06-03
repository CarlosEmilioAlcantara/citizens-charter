export const changeValue = (e, items, setItems, rowkey, field) => {
  setItems((prev) => ({
    ...prev,
    [rowkey]: {
      ...prev[rowkey],
      [field]: e.target.value,
    }
  }))
}