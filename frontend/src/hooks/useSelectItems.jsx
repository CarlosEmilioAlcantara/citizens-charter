import { useEffect, useState } from "react";
import { fetchAPI } from "../apis/fetchAPI";

export default function useSelectItems() {
  const [accessToken, setAccessToken] = useState("");
  const [route, setRoute] = useState("");
  const [selectionItems, setSelectionItems] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    async function handleGetItems() {
      try {
        const data = await fetchAPI(route, accessToken);
        setSelectionItems(data);
      } catch {
        return false;
      }
    }
    handleGetItems();
  }, [accessToken, route]);

  return {setAccessToken, setRoute, selectionItems, selected, setSelected};
}