import { useCallback, useEffect, useState } from "react";
import { fetchAPI } from "../apis/fetchAPI";

export default function useAnalytics({
  name, 
  setName, 
  route, 
  accessToken,
}) {
  const [analytics, setAnalytics] = useState({});

  const handleFetching = useCallback(async() => {
    try {
      const data = await fetchAPI(route, accessToken);
      return data;
    } catch {
      return [];
    }
  }, [route, accessToken]);

  useEffect(() => {
    if (accessToken) {
      handleFetching().then(data => {
        setAnalytics(data);
      })
    }
  }, [accessToken, handleFetching])

  return {
    [name]: analytics,
    [setName]: setAnalytics,
  };
}