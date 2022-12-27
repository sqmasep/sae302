import { Box, Container } from "@mui/material";
import React from "react";
import SavePosts from "../../components/layout/SavePosts";
import SavedDocumentsProvider from "../../contexts/SavedDocumentsProvider";
import PlaygroundPosts from "../../components/layout/PlaygroundPosts";
import PlaygroundHeader from "../../components/layout/PlaygroundHeader";
import Snackbar from "../../components/Snackbar/Snackbar";

export interface Document {
  _id: string;
  sourceLowRes: string;
  sourceHighRes: string;
  idQuestions: string[];
}

const Playground: React.FC = () => {
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "linear-gradient(to bottom, transparent 0%, #0009 100%)",
          zIndex: 100,
          pointerEvents: "none",
          touchAction: "none",
        }}
      />
      <Snackbar />
      <Container>
        <PlaygroundHeader />
        <SavedDocumentsProvider>
          <SavePosts />
          <PlaygroundPosts />
        </SavedDocumentsProvider>
      </Container>
    </>
  );
};

export default Playground;
