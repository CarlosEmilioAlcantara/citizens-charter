import { useState, useEffect } from "react";

export default function usePaging({ api }) {
  const [route, setRoute] = useState("");
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [order, setOrder] = useState("");
  const [prev, setPrev] = useState("");
  const [next, setNext] = useState("");
  const [count, setCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(null);

  const handlePaging = async (route) => {
    try {
      const data = await api(route);

      setItems(data.results);
      setPrev(data.previous);
      setNext(data.next);
      setCount(data.count);
      return true;
    } catch (err) {
      return false;
    }
  }

  useEffect(() => {
    if (route) {
      api(
        `${route}?page=${currentPage}&search=${search}&page_size=${pageSize}&ordering=${order}`
      )
      .then(data => {
        setItems(data.results);
        setPrev(data.previous);
        setNext(data.next);
        setCount(data.count);
    }).catch(error => {
      handlePaging(
        `${route}?search=${search}&page_size=${pageSize}&ordering=${order}`
      );
    });
    }
  }, [route, search, pageSize, order])

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
    order,
    setOrder,
    prev,
    next,
    count,
    currentPage,
    setCurrentPage,
    total,
    handlePaging,
  ];
}