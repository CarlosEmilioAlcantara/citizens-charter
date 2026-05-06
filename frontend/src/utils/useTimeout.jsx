import { useEffect, useState, useRef } from "react";
import useToggle from "./useToggle";

export default function useTimeout({ timeout = 3000, callback }) {
  useEffect(() => {
    const timer = setTimeout(callback, timeout);
    return () => clearTimeout(timer);
  }, [timeout, callback]);
}