import { useState } from "react";

export default function useValues(array) {
  const [values, setValues] = useState({
    ...Object.fromEntries(array.map((key) => [
      key, ''
    ]))
  });
  const [data, setData] = useState({});

  return {values, setValues, data, setData};
}