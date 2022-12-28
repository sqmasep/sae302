import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import React from "react";
import { useLocation, useRoutes } from "react-router-dom";
import NbUsers from "./components/layout/NbUsers";
import { LevelContextProvider } from "./contexts/LevelProvider";
import PreviewProvider from "./contexts/PreviewProvider";
import { Home, Playground } from "./pages";
import Temporaire from "./pages/temporaire/Temporaire";
import theme from "./theme";

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
              backgroundImage:
                "linear-gradient(to bottom, transparent 0%, #0009 100%)",
              zIndex: 1,
              pointerEvents: "none",
              touchAction: "none",
            }}
          />
        </>
      ),
    },
    { path: "/temporaire", element: <Temporaire /> },
  ]);

  const location = useLocation();

  if (!element) return null;

  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
};

export default App;
