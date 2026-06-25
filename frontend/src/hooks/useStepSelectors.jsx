import { useState } from "react";

export default function useStepSelectors() {
  const [timeSelector, setTimeSelector] = useState(false);
  const [positionSelector, setPositionSelector] = useState(false);

  const toggleTimeSelector = () => {
    setTimeSelector(prev => !prev);
  }

  const togglePositionSelector = () => {
    setPositionSelector(prev => !prev);
  }

  return {
    timeSelector, toggleTimeSelector, positionSelector, togglePositionSelector
  };
}