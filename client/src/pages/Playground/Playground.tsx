import { Box, Button, ButtonGroup, Container, Typography } from "@mui/material";
import React from "react";
import SavePosts from "../../components/layout/SavePosts";
import SavedDocumentsProvider from "../../contexts/SavedDocumentsProvider";
import PlaygroundPosts from "../../components/layout/PlaygroundPosts";
import PlaygroundHeader from "../../components/layout/PlaygroundHeader";
import Snackbar from "../../components/Snackbar/Snackbar";
import { useLevelContext } from "../../contexts/LevelProvider";
import Confetti from "react-confetti";
import WinScreen from "../../components/layout/WinScreen";

export interface Document {
  _id: string;
  sourceLowRes: string;
  sourceHighRes: string;
  idQuestions: string[];
}

const Playground: React.FC = () => {
  const { win } = useLevelContext();
  return (
    <>
      <Snackbar />
      <Container sx={{ minHeight: "100vh" }}>
        <PlaygroundHeader />
        <SavedDocumentsProvider>
          {!win ? (
            <>
              <PlaygroundPosts sx={{ py: 4 }} />
              <SavePosts />
            </>
          ) : (
            <WinScreen />
          )}
        </SavedDocumentsProvider>
      </Container>
    </>
  );
};

export default Playground;
