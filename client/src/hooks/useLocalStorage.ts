import { useState } from "react";

export const useLocalStorage = (key: string, value: any) => {
  const [state, setState] = useState();
  JSON.parse(localStorage.getItem(key));
  
