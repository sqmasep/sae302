import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { LevelContextProvider } from "./contexts/LevelProvider";
import { Home, Playground } from "./pages";
import Temporaire from "./pages/temporaire/Temporaire";
import gray from "@mui/material/colors/grey";

const theme = createTheme({
  typography: {
    fontFamily: ["Readex Pro", "sans-serif"].join(","),
    h1: {
      fontWeight: 900,
    },
    h2: {
      fontWeight: 900,
    },
    fontWeightBold: "bolder",
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#5379FF",
    },
    // background: {
    //   default: gray[900],
    // },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        backgroundColor: "#f00",
        backgroundImage:
          "linear-gradient(20deg, rebeccapurple, transparent), url(https://grainy-gradients.vercel.app/noise.svg)",
      },
    },
    MuiContainer: {
      defaultProps: {
        fixed: true,
        maxWidth: "xl",
      },
    },
    MuiStack: {
      defaultProps: {
        direction: "row",
      },
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
