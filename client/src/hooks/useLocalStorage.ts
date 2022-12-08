import { useEffect, useState } from "react";

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const savedValue = JSON.parse(localStorage.getItem(key) as string) as T;
  const [state, setState] = useState<T>(() => {
    console.log("savedValue: ", savedValue);
    if (savedValue) return savedValue;
    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state || initialValue));
  }, [state]);

  return [state, setState] as const;
};
