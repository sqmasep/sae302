import { useEffect, useState } from "react";

export const useLocalStorage = (key: string, initialValue: unknown) => {
  const [state, setState] = useState(() => {
    const savedValue = JSON.parse(localStorage.getItem(key) as string);

    if (savedValue) return savedValue;
    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(initialValue));
  }, [state]);

  return [state, setState];
};
