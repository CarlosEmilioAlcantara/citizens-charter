import { useState } from "react";

export default function useDropdown(initialValue = null) {
  const [dropdown, setDropdown] = useState(initialValue);
  return [dropdown, setDropdown];
}