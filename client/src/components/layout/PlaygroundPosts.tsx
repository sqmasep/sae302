import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import Card from "../Card/Card";
import {
  AnimatePresence,
  AnimateSharedLayout,
  motion,
  Variants,
} from "framer-motion";
import { useLevelContext } from "../../contexts/LevelProvider";
import { usePreview } from "../../contexts/PreviewProvider";
import { Document } from "../../pages/Playground/Playground";

interface CardWrapperInterface {
  card: Document;
}

const MotionGrid = motion(Grid);

const parentVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  exit: { opacity: 0 },
};
const childrenVariants: Variants = {
  hidden: { y: 50, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.3 } },
  exit: { y: -50, opacity: 0 },
};

const PlaygroundPosts: React.FC = () => {
  const { posts } = useLevelContext();
  const { selectedDocument, setSelectedDocument } = usePreview();

  return (
    posts.length && (
      <MotionGrid
        variants={parentVariants}
        initial='hidden'
        animate='show'
        exit='exit'
        container
        spacing={4}
      >
        {/* list of documents */}
        <AnimateSharedLayout>
          {posts.map(card => (
            <MotionGrid
              variants={childrenVariants}
              key={`grid-card-${card._id}`}
              item
              xs={12}
              sm={8}
              lg={2}
            >
              <CardWrapper card={card} />
            </MotionGrid>
          ))}

          <AnimatePresence>
            {/* selected document */}
            {selectedDocument && (
              // overlay
              <motion.div
                onTap={() => setSelectedDocument(null)}
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "rgba(0,0,0,0.5)",
                }}
              >
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
                    layoutId={selectedDocument._id}
                    card={selectedDocument}
                    imgSource={selectedDocument.sourceHighRes}
                  />
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </AnimateSharedLayout>
      </MotionGrid>
    )
  );
};

const CardWrapper: React.FC<CardWrapperInterface> = ({ card }) => {
  const [dragging, setDragging] = useState(false);
  const [saving, setSaving] = useState(false);
  const { setSelectedDocument } = usePreview();

  return (
    <Card
      key={`card-${card._id}`}
      layoutId={card._id}
      card={card}
      controls
      drag
      // initial={{ y: 50, opacity: 0 }}
      // animate={{ y: 0, opacity: 1, transition: { duration: 0.5 } }}
      // exit={{ y: -50, opacity: 0 }}
      // variants={childrenVariants}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => setDragging(false)}
      onPointerUp={() => !dragging && !saving && setSelectedDocument(card)}
      saving={saving}
      setSaving={setSaving}
      style={{ cursor: dragging ? "grabbing" : "pointer" }}
    />
  );
};

export default PlaygroundPosts;
