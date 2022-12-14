import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useLocation, useRoutes } from "react-router-dom";
import NbUsers from "./components/layout/NbUsers";
import { LevelContextProvider } from "./contexts/LevelProvider";
import PreviewProvider from "./contexts/PreviewProvider";
import Film from "./pages/Film/Film";
import theme from "./theme";
import SettingsProvider from "./contexts/SettingsProvider";
import { HelmetProvider } from "react-helmet-async";
import NotFound from "./404";
import CheckWinnerToken from "./pages/CheckWinnerToken/CheckWinnerToken";
import Home from "./pages/Home/Home";
import Playground from "./pages/Playground/Playground";

const MotionBox = motion(Box);

const AnimatedPage: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

const App: React.FC = () => {
  const element = useRoutes([
    {
      path: "/",
      element: (
        <AnimatedPage>
          <Home />
        </AnimatedPage>
      ),
    },
    {
      path: "/playground",
      element: (
        <>
          <AnimatedPage>
            <Playground />
          </AnimatedPage>
          <MotionBox
            initial={{ scaleY: 0, transformOrigin: "bottom" }}
            animate={{ scaleY: 1, transformOrigin: "bottom" }}
            exit={{
              scaleY: 0,
              transformOrigin: "bottom",
              transition: { duration: 0.1 },
            }}
            transition={{ duration: 0.7 }}
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              minWidth: "100vw",
              minHeight: "100vh",
              backgroundImage: "linear-gradient(to bottom, transparent, #0009)",
              zIndex: 1048,
              pointerEvents: "none",
              touchAction: "none",
            }}
          />
        </>
      ),
    },
    {
      path: "/trailer",
      element: (
        <>
          <AnimatedPage>
            <Film />
          </AnimatedPage>
          <MotionBox
            sx={{
              position: "fixed",
              inset: 0,
              zIndex: -1,
              backgroundImage: "radial-gradient(ellipse, #fff1, #000)",
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        </>
      ),
    },
    {
      path: "/check-winner-token",
      element: (
        <AnimatedPage>
          <CheckWinnerToken />
        </AnimatedPage>
      ),
    },
    {
      path: "*",
      element: (
        <AnimatedPage>
          <NotFound />
        </AnimatedPage>
      ),
    },
  ]);

  const location = useLocation();

  if (!element) return null;

  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <SettingsProvider>
          <CssBaseline />
          <LevelContextProvider>
            {/* <AnimateSharedLayout> */}
            <PreviewProvider>
              <AnimatePresence mode='wait'>
                {React.cloneElement(element, { key: location.pathname })}
              </AnimatePresence>
            </PreviewProvider>
            {/* </AnimateSharedLayout> */}
          </LevelContextProvider>
          <NbUsers />
          {/* <Chatbox /> */}
        </SettingsProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
