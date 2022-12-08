import React, { createContext, useContext } from "react";
import useArrayStorage from "../hooks/useArrayStorage";
import { Document } from "../pages/Playground/Playground";

const SavedDocumentsContext = createContext<Values>({
  documents: [],
  push: () => {},
  pushUnique: () => {},
  setArray: () => {},
  remove: () => {},
  inArray: () => false,
});

interface Values {
  documents: Document[];
  push: (element: Document) => void;
  pushUnique: (element: Document) => void;
  setArray: React.Dispatch<React.SetStateAction<Document[]>>;
  remove: (elementToRemove: Document) => void;
  inArray: (element: Document) => boolean;
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
    setArray,
  } = useArrayStorage<Document>("savedDocuments", []);

  const inArray = (element: Document) =>
    !!documents.find(doc => doc._id === element._id);

  const pushUnique = (elementToAdd: Document) => {
    if (inArray(elementToAdd)) return;
    setArray(prev => [...new Set([...prev, elementToAdd])]);
  };

  const remove = (elementToRemove: Document) => {
    setArray(prev => prev.filter(doc => doc._id !== elementToRemove._id));
  };

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
