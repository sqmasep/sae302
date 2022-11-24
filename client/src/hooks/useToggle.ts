import { useState, useCallback } from "react";

const useToggle = (initialState: boolean = false): [boolean, () => void] => {
  const [isOpen, setIsOpen] = useState(initialState);
  const toggle = useCallback(
    (forceState?: boolean) => setIsOpen(prev => forceState ?? !prev),
    []
  );

  return [isOpen, toggle];
};

export default useToggle;
