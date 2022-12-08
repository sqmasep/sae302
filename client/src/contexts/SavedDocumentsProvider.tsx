import React, { createContext, useContext } from "react";
import useArrayStorage from "../hooks/useArrayStorage";

const SavedDocumentsContext = createContext<Values>({
  documents: [],
  push: () => {},
  pushUnique: () => {},
  setArray: () => {},
  remove: () => {},
  inArray: () => false,
});

interface Values {
  documents: string[];
  push: (element: string) => void;
  pushUnique: (element: string) => void;
  setArray: React.Dispatch<React.SetStateAction<string[]>>;
  remove: (elementToRemove: string) => void;
  inArray: (element: string) => boolean;
}

interface SavedDocumentsInterface {
  children: React.ReactNode;
}

const SavedDocumentsProvider: React.FC<SavedDocumentsInterface> = ({
  children,
}) => {
  const {
    array: documents,
    push,
    pushUnique,
    setArray,
    remove,
    inArray,
  } = useArrayStorage<string>("savedDocuments", []);
  return (
    <SavedDocumentsContext.Provider
      value={{ documents, push, pushUnique, setArray, remove, inArray }}
    >
      {children}
    </SavedDocumentsContext.Provider>
  );
};

export const useSavedDocuments = () => useContext(SavedDocumentsContext);
export default SavedDocumentsProvider;
