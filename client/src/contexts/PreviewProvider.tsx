import React, { createContext, useContext } from "react";

interface Values {
  selected: string;
}

interface PreviewProviderInterface {
  children: React.ReactNode;
}

const PreviewContext = createContext<Values>({
  selected: "",
});

const PreviewProvider: React.FC<PreviewProviderInterface> = ({ children }) => {
  return (
    <PreviewContext.Provider value={{ selected: "" }}>
      {children}
    </PreviewContext.Provider>
  );
};

export const usePreview = () => useContext(PreviewContext);
export default PreviewProvider;
