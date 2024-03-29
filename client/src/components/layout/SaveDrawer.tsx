import { Drawer, Stack, styled, Typography } from "@mui/material";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import React, { useState } from "react";
import { usePreview } from "../../contexts/PreviewProvider";
import { useSavedDocuments } from "../../contexts/SavedDocumentsProvider";
import { useSettings } from "../../contexts/SettingsProvider";
import { Document } from "../../pages/Playground/Playground";
import Card from "../Card/Card";

interface SaveDrawerInterface {
  isOpen: boolean;
  toggle: (forceState?: boolean) => void;
}

interface CardWrapperInterface {
  card: Document;
}

const MotionTypography = motion(Typography);

const StyledDrawer = styled(Drawer)(() => ({
  "& .MuiDrawer-paper": {
    backgroundColor: "black",
    overflowY: "auto",
    overflowX: "hidden",
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
        <AnimatePresence>
          <AnimateSharedLayout>
            {documents?.length ? (
              documents.map(doc => (
                <CardWrapper layoutId={doc._id} key={doc._id} card={doc} />
              ))
            ) : (
              <MotionTypography
                initial={{
                  y: -50,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                exit={{
                  y: -50,
                  opacity: 0,
                }}
                transition={{ duration: 0.4 }}
                textAlign='center'
                fontSize={24}
              >
                Aucun document sauvegardé
              </MotionTypography>
            )}
          </AnimateSharedLayout>
        </AnimatePresence>
      </Stack>
    </StyledDrawer>
  );
};

const CardWrapper: React.FC<
  CardWrapperInterface & React.ComponentProps<typeof Card>
> = ({ card, ...props }) => {
  const [saving, setSaving] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const { setSelectedDocument } = usePreview();
  const { playRandomSfx } = useSettings();

  return (
    <Card
      controls
      card={card}
      drag
      dragConstraints={{ left: -5, right: -5, top: -5, bottom: -5 }}
      dragElastic={0.02}
      layoutId={card._id}
      onPointerDown={() => setIsClicking(true)}
      onPointerUp={() => {
        if (!saving && isClicking) {
          playRandomSfx();
          !saving && isClicking && setSelectedDocument(card);
        }
        setSaving(false);
        setIsClicking(false);
      }}
      {...props}
      saving={saving}
      setSaving={setSaving}
      whileHover={{
        scale: 1.05,
        rotateZ: -5,
      }}
      whileTap={!saving ? { scale: 0.95 } : undefined}
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      // exit={{ scale: 0, opacity: 0 }}
    />
  );
};

export default SaveDrawer;
