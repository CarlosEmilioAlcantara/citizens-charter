import { useCallback, useEffect, useState } from "react";
import { fetchAPI } from "../apis/fetchAPI";

export default function useSectorsInfo({ route, accessToken = "" }) {
  const [sectorsInfo, setSectorsInfo] = useState({});

  const handleSectorsInfo = useCallback(async () => {
    try {
      const data = await fetchAPI(route, accessToken);
      setSectorsInfo(data);
    } catch {
      return false;
    }
  }, [route, accessToken]);

  useEffect(() => {
    handleSectorsInfo();
  }, [handleSectorsInfo])

  return [sectorsInfo];
}