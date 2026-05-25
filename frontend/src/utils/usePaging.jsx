import { useState, useEffect, useCallback } from "react";

export default function usePaging(api) {
  const [route, setRoute] = useState("");
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [ordering, setOrdering] = useState("");
  const [prev, setPrev] = useState("");
  const [next, setNext] = useState("");
  const [count, setCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(null);

  const handlePaging = useCallback(async (route) => {
    try {
      const data = await api(route);

      setItems(data.results);
      setPrev(data.previous);
      setNext(data.next);
      setCount(data.count);
      return true;
    } catch {
      return false;
    }
  }, [api]);

  useEffect(() => {
    if (route) {
      api(
        `${route}?page=${currentPage}&search=${search}&page_size=${pageSize}&ordering=${ordering}`
      )
      .then(data => {
        setItems(data.results);
        setPrev(data.previous);
        setNext(data.next);
        setCount(data.count);
    }).catch(() => {
      handlePaging(
        `${route}?search=${search}&page_size=${pageSize}&ordering=${ordering}`
      );
    });
    }
  }, [api, route, search, currentPage, handlePaging, pageSize, ordering])

  useEffect(() => {
    setTotal(items.length)
  }, [items])

  return [
    route,
    setRoute,
    items,
    search,
    setSearch,
    pageSize,
    setPageSize,
    ordering,
    setOrdering,
    prev,
    next,
    count,
    currentPage,
    setCurrentPage,
    total,
    handlePaging,
  ];
}