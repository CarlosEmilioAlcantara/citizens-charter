export const changeValue = (e, setItems, rowkey, field) => {
  setItems((prev) => ({
    ...prev,
    [rowkey]: {
      ...prev[rowkey],
      [field]: e.target.value,
    }
  }))
}