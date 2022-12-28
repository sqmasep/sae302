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
      <Snackbar />
      <Container sx={{ minHeight: "100vh" }}>
        <PlaygroundHeader />
        <SavedDocumentsProvider>
          <PlaygroundPosts />
          <SavePosts />
        </SavedDocumentsProvider>
      </Container>
    </>
  );
};

export default Playground;
