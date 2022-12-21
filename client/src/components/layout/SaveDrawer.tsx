import { Box, Drawer, Stack, styled } from "@mui/material";
import React from "react";
import { useSavedDocuments } from "../../contexts/SavedDocumentsProvider";
import Card from "../Card/Card";

interface SaveDrawerInterface {
  isOpen: boolean;
  toggle: (forceState?: boolean) => void;
}

const StyledDrawer = styled(Drawer)(() => ({
  "&	.MuiDrawer-paper": {
    overflowY: "unset",
    maxWidth: "20rem",
    paddingInline: "3rem",
  },
}));

const SaveDrawer: React.FC<SaveDrawerInterface> = ({ isOpen, toggle }) => {
  const { documents } = useSavedDocuments();

  return (
    <StyledDrawer onClose={() => toggle(false)} anchor='right' open={isOpen}>
      <Stack direction='column'>
        {documents?.length
          ? documents.map(doc => <Card key={doc._id} card={doc} />)
          : "Aucun document sauvegardé"}
      </Stack>
    </StyledDrawer>
  );
};

export default SaveDrawer;
