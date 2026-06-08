import { useCallback, useEffect, useState } from "react";
import { fetchAPI } from "../apis/fetchAPI";

export default function useListInfo({ route, accessToken = "" }) {
  const [listInfo, setListInfo] = useState({});

  const handleListInfo = useCallback(async () => {
    try {
      const data = await fetchAPI(route, accessToken);
      setListInfo(data);
    } catch {
      return false;
    }
  }, [route, accessToken]);

  useEffect(() => {
    handleListInfo();
  }, [handleListInfo])

  return [listInfo];
}