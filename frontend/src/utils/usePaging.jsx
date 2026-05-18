import { useState, useEffect } from "react";

export default function usePaging({ api }) {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [prev, setPrev] = useState("");
  const [next, setNext] = useState("");
  const [count, setCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(null);

  const handlePaging = async (page) => {
    api({ 
      page: page, 
      search: search, 
      page_size: pageSize, 
    }).then(data => {
      setItems(data.results);
      setPrev(data.previous);
      setNext(data.next);
      setCount(data.count);
    });
  }

  useEffect(() => {
    api({
      search: search, 
      current_page: currentPage, 
      page_size: pageSize 
    }).then(data => {
      setItems(data.results);
      setPrev(data.previous);
      setNext(data.next);
      setCount(data.count);
    });
  }, [search, pageSize])

  useEffect(() => {
    setTotal(items.length)
  }, [items])

  return [
    items,
    search,
    setSearch,
    pageSize,
    setPageSize,
    prev,
    next,
    count,
    currentPage,
    setCurrentPage,
    total,
    handlePaging,
  ];
}