import { useEffect, useState } from "react";

export const useLocalStorage = (key: string, initialValue: unknown) => {
  const savedValue = JSON.parse(localStorage.getItem(key) as string);
  const [state, setState] = useState(() => {
    console.log("savedValue: ", savedValue);
    if (savedValue) return savedValue;
    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state || initialValue));
  }, [state]);

  return [state, setState];
};
