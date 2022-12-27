import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";
import NbUsers from "./components/layout/NbUsers";
import { LevelContextProvider } from "./contexts/LevelProvider";
import PreviewProvider from "./contexts/PreviewProvider";
import { Home, Playground } from "./pages";
import Temporaire from "./pages/temporaire/Temporaire";
import theme from "./theme";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LevelContextProvider>
        <PreviewProvider>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/playground' element={<Playground />} />
            <Route path='/temporaire' element={<Temporaire />} />
          </Routes>
          <NbUsers />
        </PreviewProvider>
      </LevelContextProvider>
    </ThemeProvider>
  );
};

export default App;
