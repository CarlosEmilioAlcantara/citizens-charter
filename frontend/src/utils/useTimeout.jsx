import { useEffect, useState, useRef } from "react";
import useToggle from "./useToggle";

export default function useTimeout({ 
  initialValue = false, 
  timeout = 3000, 
  onClose,
}) {
  const [show, setShow] = useState(initialValue);

  useEffect(() => {
    const enter = setTimeout(() => setShow(true), 10);
    const exit = setTimeout(() => setShow(false), timeout);
    const remove = setTimeout(() => onClose?.(), timeout + 300);
    
    return () => {
      clearTimeout(enter);
      clearTimeout(exit);
      clearTimeout(remove);
    }
  }, [timeout, onClose]);

  return show;
}