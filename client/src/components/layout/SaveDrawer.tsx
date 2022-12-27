import { Drawer, Stack, styled, Typography } from "@mui/material";
import React, { useState } from "react";
import { usePreview } from "../../contexts/PreviewProvider";
import { useSavedDocuments } from "../../contexts/SavedDocumentsProvider";
import { Document } from "../../pages/Playground/Playground";
import Card from "../Card/Card";

interface SaveDrawerInterface {
  isOpen: boolean;
  toggle: (forceState?: boolean) => void;
}

interface CardWrapperInterface {
  card: Document;
}

const StyledDrawer = styled(Drawer)(() => ({
  "&	.MuiDrawer-paper": {
    overflowY: "auto",
    maxWidth: "20rem",
    paddingInline: "3rem",
    paddingBlockStart: "2rem",
  },
}));

const SaveDrawer: React.FC<SaveDrawerInterface> = ({ isOpen, toggle }) => {
  const { documents } = useSavedDocuments();

  return (
    <StyledDrawer onClose={() => toggle(false)} anchor='right' open={isOpen}>
      <Stack direction='column' gap={4}>
        {documents?.length ? (
          documents.map(doc => <CardWrapper key={doc._id} card={doc} />)
        ) : (
          <Typography textAlign='center' fontSize={24}>
            Aucun document sauvegardé
          </Typography>
        )}
      </Stack>
    </StyledDrawer>
  );
};

const CardWrapper: React.FC<CardWrapperInterface> = ({ card }) => {
  const [saving, setSaving] = useState(false);
  const { setSelectedDocument } = usePreview();

  return (
    <Card
      controls
      key={card._id}
      card={card}
      layoutId={card._id}
      onPointerUp={() => !saving && setSelectedDocument(card)}
      initial={{ transformOrigin: "bottom" }}
      whileHover={{
        scale: 1.05,
        rotateZ: -5,
      }}
      saving={saving}
      setSaving={setSaving}
      whileTap={{ scale: !saving ? 0.95 : 1 }}
    />
  );
};

export default SaveDrawer;
