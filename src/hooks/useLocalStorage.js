import { useState } from "react";

export default function useLocalStorage(key, initialValue) {
  const readValue = () => {
    try {
      const stored = localStorage.getItem(key);

 
      if (!stored || stored === "undefined" || stored === "null") {
        return initialValue;
      }

      return JSON.parse(stored);
    } catch (error) {
      console.warn("LocalStorage parse error:", error);
      return initialValue;
    }
  };

  const [value, setValue] = useState(readValue);

  const updateValue = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, updateValue];
}
