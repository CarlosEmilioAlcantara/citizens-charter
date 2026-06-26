import { useCallback, useEffect, useState } from "react";
import { fetchAPI } from "../apis/fetchAPI";

export default function useOfficePositions(accessToken) {
  const [positions, setPositions] = useState([]);
  const [selectedPositions, setSelectedPositions] = useState([]);

  const handleFetching = useCallback(async () => {
    try {
      const data = await fetchAPI("/api/office-positions", accessToken);
      return data;
    } catch {
      return false
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      handleFetching().then(data => setPositions(data));
    }
  }, [accessToken, handleFetching])

  return [positions, setPositions, selectedPositions, setSelectedPositions];
}