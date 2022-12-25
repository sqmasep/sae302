import { Drawer, Stack, styled } from "@mui/material";
import React from "react";
import { usePreview } from "../../contexts/PreviewProvider";
import { useSavedDocuments } from "../../contexts/SavedDocumentsProvider";
import Card from "../Card/Card";

interface SaveDrawerInterface {
  isOpen: boolean;
  toggle: (forceState?: boolean) => void;
}

const StyledDrawer = styled(Drawer)(() => ({
  "&	.MuiDrawer-paper": {
    overflowY: "auto",
    maxWidth: "20rem",
    paddingInline: "3rem",
  },
}));

const SaveDrawer: React.FC<SaveDrawerInterface> = ({ isOpen, toggle }) => {
  const { documents } = useSavedDocuments();
  const { setSelectedDocument } = usePreview();

  return (
    <StyledDrawer onClose={() => toggle(false)} anchor='right' open={isOpen}>
      <Stack direction='column' gap={4}>
        {documents?.length
          ? documents.map(doc => (
              <Card
                controls
                key={doc._id}
                card={doc}
                layoutId={doc._id}
                onTap={() => setSelectedDocument(doc)}
                initial={{ transformOrigin: "bottom" }}
                whileHover={{
                  scale: 1.05,
                  rotateZ: -5,
                }}
                whileTap={{ scale: 0.95 }}
              />
            ))
          : "Aucun document sauvegardé"}
      </Stack>
    </StyledDrawer>
  );
};

export default SaveDrawer;
