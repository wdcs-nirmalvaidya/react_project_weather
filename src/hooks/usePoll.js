import { useEffect } from "react";

export default function usePoll(callback, delay) {
  useEffect(() => {
    if (!delay) return;

    callback(); // run immediately

    const interval = setInterval(() => {
      callback();
    }, delay);

    return () => clearInterval(interval); // cleanup
  }, [callback, delay]);
}
