import { useState, useEffect, useCallback } from "react";

export default function usePaging(api) {
  const [accessToken, setAccessToken] = useState("");
  const [route, setRoute] = useState("");
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [ordering, setOrdering] = useState("");
  const [field, setField] = useState("");
  const [filter, setFilter] = useState("");
  const [filters, setFilters] = useState([]);
  const [filtersRoute, setFiltersRoute] = useState("");
  const [prev, setPrev] = useState("");
  const [next, setNext] = useState("");
  const [count, setCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(null);

  const handlePaging = useCallback(async (route, accessToken = "") => {
    try {
      const data = await api(route, accessToken);

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
        `${route}?page=${currentPage}&search=${search}&page_size=${pageSize}&ordering=${ordering}&${field}=${filter}`,
        accessToken
      )
      .then(data => {
        setItems(data.results);
        setPrev(data.previous);
        setNext(data.next);
        setCount(data.count);
    }).catch(() => {
      handlePaging(
        `${route}?search=${search}&page_size=${pageSize}&ordering=${ordering}&${field}=${filter}`,
        accessToken
      );
    });
    }
  }, [
    api, 
    route, 
    accessToken,
    search, 
    currentPage, 
    handlePaging, 
    pageSize, 
    ordering, 
    field, 
    filter,
  ])

  useEffect(() => {
    setTotal(items.length)
  }, [items])

  useEffect(() => {
    if (filtersRoute) {
      api(filtersRoute, accessToken).then(data => setFilters([...data]));
    }
  }, [api, filtersRoute, accessToken])

  return {
    accessToken,
    setAccessToken,
    route,
    setRoute,
    items,
    setItems,
    search,
    setSearch,
    pageSize,
    setPageSize,
    ordering,
    setOrdering,
    field,
    setField,
    filter,
    setFilter,
    filters,
    setFiltersRoute,
    prev,
    next,
    count,
    currentPage,
    setCurrentPage,
    total,
    handlePaging,
  };
}