import { useState } from "react";

export default function useTableControls() {
  const [dropdown, setDropdown] = useState(null);
  const [pageSizeSelector, setPageSizeSelector] = useState(false);
  const [filterSelector, setFilterSelector] = useState(false);

  const closeControls = () => {
    setDropdown(null);
    setPageSizeSelector(false);
    setFilterSelector(false);
  }

  const togglePageSizeSelector = () => {
    setDropdown(null);
    setPageSizeSelector(prev => !prev);
    setFilterSelector(false);
  }

  const toggleFilterSelector = () => {
    setDropdown(null);
    setPageSizeSelector(false);
    setFilterSelector(prev => !prev);
  }

  const toggleDropdown = (key) => {
    setPageSizeSelector(false);
    setFilterSelector(false);
    setDropdown(prev => (prev === key ? null : key));
  }

  return {
    dropdown, 
    pageSizeSelector, 
    filterSelector,
    closeControls,
    togglePageSizeSelector,
    toggleFilterSelector,
    toggleDropdown,
  };
}