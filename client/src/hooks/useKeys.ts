import { useEffect } from "react";

const useKeys = (keys: string[], callback: () => void) => {
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      keys.includes(e.key) && callback();
    };

    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [keys, callback]);
};

export default useKeys;
