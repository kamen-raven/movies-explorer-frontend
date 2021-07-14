import { useState, useEffect } from "react";

export function useWindowWidthSize() {
  const [widthSize, setWidthSize] = useState([window.innerWidth]);

  function handleResize() {
    setWidthSize([window.innerWidth]);
  }

  useEffect(() => {
    window.addEventListener("resize", () => {
      setTimeout(() => {handleResize()}, 1000)
    });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  },[]);
  return widthSize;
}
