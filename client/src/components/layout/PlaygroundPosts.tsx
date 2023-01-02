import React, { useEffect, useState } from "react";
import { Box, Grid, IconButton } from "@mui/material";
import Card from "../Card/Card";
import {
  animate,
  AnimatePresence,
  AnimateSharedLayout,
  motion,
  useMotionValue,
  Variants,
} from "framer-motion";
import { useLevelContext } from "../../contexts/LevelProvider";
import { usePreview } from "../../contexts/PreviewProvider";
import { Document } from "../../pages/Playground/Playground";
import socket from "../../lib/socket";
import Loading from "../Loading/Loading";
import { useSettings } from "../../contexts/SettingsProvider";
import { Close } from "@mui/icons-material";
import useKeys from "../../hooks/useKeys";

interface CardWrapperInterface {
  card: Document;
}

const MotionGrid = motion(Grid);

const parentVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, when: "beforeChildren" },
  },
  exit: { opacity: 0 },
};
const childrenVariants: Variants = {
  hidden: { y: 50, opacity: 0 },
  show: {
    y: 0,
    opacity: [0, 0, 1],
    transition: { duration: 0.3, type: "spring", stiffness: 100 },
  },
  exit: { y: -50, opacity: 0, transition: { duration: 0.3 } },
};

const PlaygroundPosts: React.FC<React.ComponentProps<typeof MotionGrid>> = ({
  ...props
}) => {
  const { posts, isLoading } = useLevelContext();
  const { selectedDocument, setSelectedDocument } = usePreview();

  useKeys(["Escape", "Backspace"], () => setSelectedDocument(null));

  return posts.length ? (
    <MotionGrid
      {...props}
      variants={parentVariants}
      initial='hidden'
      animate='show'
      // exit='exit'
      container
      spacing={4}
      alignItems='center'
    >
      {/* list of documents */}
      <AnimateSharedLayout>
        {posts.map(card => (
          <MotionGrid
            variants={childrenVariants}
            key={`grid-card-${card._id}`}
            item
            xs={12}
            sm={6}
            lg={3}
          >
            <CardWrapper
              card={card}
              sx={{ transform: `rotateZ(${Math.floor(Math.random() * 100)}` }}
            />
          </MotionGrid>
        ))}

        <AnimatePresence>
          {/* selected document */}
          {selectedDocument && (
            <motion.div
              onTap={() => setSelectedDocument(null)}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 1000,
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,0.5)",
              }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              {/* close button */}
              <Box sx={{ position: "absolute", right: 0, m: 5, zIndex: 1 }}>
                <IconButton onClick={() => setSelectedDocument(null)}>
                  <Close />
                </IconButton>
              </Box>

              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Card
                  style={{
                    width: "fit-content",
                    maxWidth: "95%",
                    margin: "auto",
                  }}
                  onPointerDownCapture={e => e.stopPropagation()}
                  layoutId={`card-${selectedDocument._id}`}
                  card={selectedDocument}
                  imgSource={selectedDocument.sourceHighRes}
                />
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </AnimateSharedLayout>
    </MotionGrid>
  ) : isLoading ? (
    <Loading />
  ) : (
    <>Pas de documents</>
  );
};

const CardWrapper: React.FC<
  CardWrapperInterface & React.ComponentProps<typeof Card>
> = ({ card, ...props }) => {
  const [dragging, setDragging] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const { playRandomSfx } = useSettings();
  const { setSelectedDocument } = usePreview();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  socket.on("receiveToken", () => {
    animate(x, 0, { duration: 0.5 });
    animate(y, 0, { duration: 0.5 });
  });

  return (
    <Card
      {...props}
      key={`card-${card._id}`}
      layoutId={`card-${card._id}`}
      card={card}
      controls
      drag
      x={x}
      y={y}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => setDragging(false)}
      onPointerDown={() => setIsClicking(true)}
      onPointerUp={() => {
        if (!dragging && !saving && isClicking) {
          setSelectedDocument(card);
          playRandomSfx();
        }
        setIsClicking(false);
      }}
      saving={saving}
      setSaving={setSaving}
      style={{
        cursor: dragging ? "grabbing" : "grab",
        zIndex: dragging ? 1000 : 0,
      }}
    />
  );
};

export default PlaygroundPosts;
