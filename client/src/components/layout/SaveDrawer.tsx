import { Drawer, Stack, styled, Typography } from "@mui/material";
import { AnimatePresence, AnimateSharedLayout } from "framer-motion";
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
  "& .MuiDrawer-paper": {
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
          <AnimateSharedLayout>
            <AnimatePresence>
              {documents.map(doc => (
                <CardWrapper key={doc._id} card={doc} />
              ))}
            </AnimatePresence>
          </AnimateSharedLayout>
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
  const [isClicking, setIsClicking] = useState(false);
  const { setSelectedDocument } = usePreview();

  return (
    <Card
      controls
      card={card}
      layoutId={card._id}
      onPointerDown={() => setIsClicking(true)}
      onPointerUp={() => {
        !saving && isClicking && setSelectedDocument(card);
        setSaving(false);
        setIsClicking(false);
      }}
      whileHover={{
        scale: 1.05,
        rotateZ: -5,
      }}
      whileTap={!saving ? { scale: 0.95 } : undefined}
      // initial={{ x: 10, transformOrigin: "bottom" }}
      // animate={{ x: 0, opacity: 1 }}
      // exit={{ x: -50, opacity: 0 }}

      saving={saving}
      setSaving={setSaving}
    />
  );
};

export default SaveDrawer;
