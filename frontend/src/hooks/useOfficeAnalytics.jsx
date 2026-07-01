import { useCallback, useEffect, useState } from "react";
import { fetchAPI } from "../apis/fetchAPI";

export default function useOfficeAnalytics(accessToken) {
  const [analytics, setAnalytics] = useState({});

  const handleFetching = useCallback(async() => {
    try {
      const data = await fetchAPI("/api/office-analytics", accessToken);
      return data;
    } catch {
      return [];
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      handleFetching().then(data => {
        setAnalytics(data);
      })
    }
  }, [accessToken, handleFetching])

  return [analytics];
}