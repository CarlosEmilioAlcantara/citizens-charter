// Utility function for popups
import { useEffect, useState } from "react";

export default function useShow({ 
  initialValue = false, 
  timeout = 300, 
  onClose,
}) {
  const [show, setShow] = useState(initialValue);

  useEffect(() => {
    const enter = setTimeout(() => setShow(true), 10);
    return () => { clearTimeout(enter); };
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => onClose?.(), timeout);
  }

  return [show, handleClose];
}