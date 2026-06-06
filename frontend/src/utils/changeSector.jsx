export const changeSector = (sector, setItems, rowkey) => {
  setItems((prev) => ({
    ...prev,
    [rowkey]: {
      ...prev[rowkey],
      sector: sector.id,
      sector_name: sector.name,
    }
  }));
};