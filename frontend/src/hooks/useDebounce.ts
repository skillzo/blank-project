import { useState, useEffect } from "react";

export const useDebounce = (val: string, delay: number) => {
  const [debounceVal, setDebounceVal] = useState(val);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceVal(val);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [val, delay]);

  return debounceVal;
};
