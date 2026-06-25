import { useState } from "react";

export default function useTimeSelector() {
  const [timeSelector, setTimeSelector] = useState(false);

  const toggleTimeSelector = () => {
    setTimeSelector(prev => !prev);
  }

  return {timeSelector, toggleTimeSelector};
}