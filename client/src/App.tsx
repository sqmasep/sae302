import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { LevelContextProvider } from "./contexts/LevelProvider";
import { Home, Playground } from "./pages";
import Temporaire from "./pages/temporaire/Temporaire";

const theme = createTheme({
  typography: {
    fontFamily: "Readex Pro",
  },
  palette: {
    primary: {
      main: "#5379FF",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {},
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <LevelContextProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/playground' element={<Playground />} />
          <Route path='/temporaire' element={<Temporaire />} />
        </Routes>
      </LevelContextProvider>
    </ThemeProvider>
  );
};

export default App;
