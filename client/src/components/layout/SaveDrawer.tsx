import { Box, Drawer, Stack } from "@mui/material";
import React from "react";
import { useSavedDocuments } from "../../contexts/SavedDocumentsProvider";

interface SaveDrawerInterface {
  isOpen: boolean;
  toggle: (forceState?: boolean) => void;
}

const SaveDrawer: React.FC<SaveDrawerInterface> = ({ isOpen, toggle }) => {
  const { documents } = useSavedDocuments();

  return (
    <Drawer onClose={() => toggle(false)} anchor='right' open={isOpen}>
      <Stack direction='column'>
        {documents?.length
          ? documents.map(doc => <img src={`/imgs/playground/${doc}`} />)
          : "Aucun document sauvegardé"}
      </Stack>
    </Drawer>
  );
};

export default SaveDrawer;
