import { useLocalStorage } from "./useLocalStorage";

const useArrayStorage = <T>(key: string, initial: T[]) => {
  const [array, setArray] = useLocalStorage(key, initial);

  const push = (element: T) => setArray((prev: T[]) => [...prev, element]);
  const pushUnique = (element: T) =>
    setArray((prev: T[]) => [...new Set([...prev, element])]);
  const remove = (elementToRemove: T) =>
    setArray(array.filter((element: T) => element !== elementToRemove));

  const inArray = (element: T): boolean => array.includes(element);

  return { push, remove, inArray, pushUnique, array, setArray };
};

export default useArrayStorage;
