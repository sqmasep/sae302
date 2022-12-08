import React, { createContext, useContext, useState } from "react";

interface Values {
  selected: {};
}

interface PreviewProviderInterface {
  children: React.ReactNode;
}

const PreviewContext = createContext<Values>({
  selected: "",
});

const PreviewProvider: React.FC<PreviewProviderInterface> = ({ children }) => {
  const [selected, setSelected] = useState({});
  return (
    <PreviewContext.Provider value={{ selected }}>
      {children}
    </PreviewContext.Provider>
  );
};

export const usePreview = () => useContext(PreviewContext);
export default PreviewProvider;
