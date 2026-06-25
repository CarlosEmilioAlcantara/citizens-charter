import { getSeconds } from "./getSeconds";

export const changeTime = (value, timeFormat, setItems, rowkey) => {
  setItems((prev) => ({
    ...prev,
    [rowkey]: {
      ...prev[rowkey],
      processing_time: Number(getSeconds(value, timeFormat)),
    }
  }));
};