import { useEffect, useState } from "react";

export default function useSearch(items) {
  const [staticSearch, setStaticSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    if (staticSearch.length === 0) {
      setFilteredItems(items);
      return;
    }

    setFilteredItems(
      items.filter((item) => 
        item.name.toLowerCase().includes(staticSearch.toLowerCase())
      )
    );
  }, [items, staticSearch])

  return {staticSearch, setStaticSearch, filteredItems, setFilteredItems};
}