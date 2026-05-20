import { useEffect, useState } from "react";

export default function useWindowWidth({ initialValue = window.innerWidth }) {
  const [windowWidth, setWindowWidth] = useState(initialValue)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => removeEventListener("resize", handleResize);
  }, []);

  return [windowWidth];
}