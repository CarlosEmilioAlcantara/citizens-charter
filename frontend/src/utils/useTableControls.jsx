import { useState } from "react";

export default function useTableControls() {
  const [dropdown, setDropdown] = useState(null);
  const [pageSizeSelector, setPageSizeSelector] = useState(false);

  const closeControls = () => {
    setDropdown(null);
    setPageSizeSelector(false);
  }

  const togglePageSizeSelector = () => {
    setDropdown(null);
    setPageSizeSelector(prev => !prev);
  }

  const toggleDropdown = (key) => {
    setPageSizeSelector(false);
    setDropdown(dropdown === key ? null : key);
  }

  return {
    dropdown, 
    pageSizeSelector, 
    closeControls,
    togglePageSizeSelector,
    toggleDropdown,
  };
}