import { AnimatePresence, motion } from "framer-motion";
import React, { createContext, useContext, useState } from "react";
import { Document } from "../pages/Playground/Playground";

interface Values {
  selectedDocument: Document | null;
  setSelectedDocument: React.Dispatch<React.SetStateAction<Document | null>>;
}

interface PreviewProviderInterface {
  children: React.ReactNode;
}

const PreviewContext = createContext<Values>({
  selectedDocument: null,
  setSelectedDocument: () => {},
});

const PreviewProvider: React.FC<PreviewProviderInterface> = ({ children }) => {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );

  return (
    <PreviewContext.Provider value={{ selectedDocument, setSelectedDocument }}>
      {children}
      <pre>{JSON.stringify(selectedDocument, null, 2)}</pre>
    </PreviewContext.Provider>
  );
};

export const usePreview = () => useContext(PreviewContext);
export default PreviewProvider;
