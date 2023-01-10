import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Link,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SavePosts from "../../components/layout/SavePosts";
import SavedDocumentsProvider from "../../contexts/SavedDocumentsProvider";
import PlaygroundPosts from "../../components/layout/PlaygroundPosts";
import PlaygroundHeader from "../../components/layout/PlaygroundHeader";
import Snackbar from "../../components/Snackbar/Snackbar";
import { useLevelContext } from "../../contexts/LevelProvider";
import Confetti from "react-confetti";
import WinScreen from "../../components/layout/WinScreen";
import { Helmet } from "react-helmet-async";
import { Bookmark, Close, PanTool, ZoomIn } from "@mui/icons-material";

export interface Document {
  _id: string;
  sourceLowRes: string;
  sourceHighRes: string;
  idQuestions: string[];
}

const Playground: React.FC = () => {
  const { win, token } = useLevelContext();
  const [dialogIsOpen, setDialogIsOpen] = useState(true);
  const closeDialog = () => setDialogIsOpen(false);

  return (
    <>
      <Helmet>
        <title>Interférences - Playground</title>
      </Helmet>

      <Snackbar />

      <Container sx={{ minHeight: "100vh" }}>
        <PlaygroundHeader />
        <SavedDocumentsProvider>
          {!win ? (
            <>
              {token === "0" && (
                <Dialog open={dialogIsOpen}>
                  <DialogTitle>Bienvenue jeune enquêteur !</DialogTitle>
                  <IconButton
                    sx={{ position: "absolute", right: 0, m: 1 }}
                    onClick={closeDialog}
                  >
                    <Close />
                  </IconButton>

                  <DialogContent>
                    <DialogContentText>
                      Le projet et les documents sont fictifs. Tu peux:
                      <List>
                        {[
                          {
                            icon: <ZoomIn />,
                            text: "Cliquer pour zoomer sur un document",
                            mobile: true,
                          },
                          {
                            icon: <PanTool />,
                            text: "Bouger les éléments",
                            mobile: false,
                          },
                          {
                            icon: <Bookmark />,
                            text: "Sauvegarder les documents",
                            mobile: true,
                          },
                        ].map(feature => {
                          if ("ontouchstart" in window && !feature.mobile) {
                            return null;
                          }

                          return (
                            <ListItem key={feature.text}>
                              <Box sx={{ mr: 1 }}>{feature.icon}</Box>
                              {feature.text}
                            </ListItem>
                          );
                        })}
                      </List>
                      Tu peux retrouver{" "}
                      <Link href='/'>une vidéo explicative ici</Link>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={closeDialog}>Ça marche !</Button>
                  </DialogActions>
                </Dialog>
              )}

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
