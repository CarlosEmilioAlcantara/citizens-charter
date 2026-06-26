export const changePositions = (positions, setItems, rowkey) => {
  const names = positions.map(position => position.name);
  const ids = positions.map(position => position.id);
  setItems((prev) => ({
    ...prev,
    [rowkey]: {
      ...prev[rowkey],
      positions: names,
      position: ids,
    }
  }));
}