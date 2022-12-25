import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import Card from "../Card/Card";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import { useLevelContext } from "../../contexts/LevelProvider";
import { usePreview } from "../../contexts/PreviewProvider";
import { Document } from "../../pages/Playground/Playground";

interface CardWrapperInterface {
  card: Document;
}

const PlaygroundPosts: React.FC = () => {
  const { posts } = useLevelContext();
  const { selectedDocument, setSelectedDocument } = usePreview();

  return (
    <Grid container spacing={4}>
      {/* list of documents */}
      <AnimateSharedLayout>
        {posts.map(card => (
          <Grid key={`grid-card-${card._id}`} item xs={12} sm={8} lg={2}>
            {/* <motion.div onTap={() => setSelectedDocument(card)}>
              <Card layoutId={card._id} card={card} controls drag />
            </motion.div> */}
            <CardWrapper card={card} />
          </Grid>
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
    </Grid>
  );
};

const CardWrapper: React.FC<CardWrapperInterface> = ({ card }) => {
  const [dragging, setDragging] = useState(false);
  const [saving, setSaving] = useState(false);
  const { setSelectedDocument } = usePreview();

  return (
    <motion.div>
      <Card
        key={`card-${card._id}`}
        layoutId={card._id}
        card={card}
        controls
        drag
        onDragStart={() => setDragging(true)}
        onDragEnd={() => setDragging(false)}
        onPointerUp={() => !dragging && !saving && setSelectedDocument(card)}
        saving={saving}
        setSaving={setSaving}
        style={{ cursor: dragging ? "grabbing" : "pointer" }}
      />
    </motion.div>
  );
};

export default PlaygroundPosts;
