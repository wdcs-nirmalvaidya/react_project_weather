import { useEffect } from "react";

export default function usePoll(callback, delay) {
  useEffect(() => {
    if (!delay) return;

    callback(); 
    const interval = setInterval(() => {
      callback();
    }, delay);

    return () => clearInterval(interval); 
  }, [callback, delay]);
}
