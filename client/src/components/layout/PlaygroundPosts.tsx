import React from "react";
import { Box, Grid } from "@mui/material";
import Card from "../Card/Card";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import { useLevelContext } from "../../contexts/LevelProvider";
import { usePreview } from "../../contexts/PreviewProvider";

const PlaygroundPosts = () => {
  const { posts } = useLevelContext();
  const { selectedDocument, setSelectedDocument } = usePreview();

  return (
    <Grid container gap={4}>
      {/* list of documents */}
      <AnimateSharedLayout>
        {posts.map(card => (
          <Grid key={`grid-card-${card._id}`} item xs={12} sm={8} lg={2}>
            <motion.div onClick={() => setSelectedDocument(card)}>
              <Card layoutId={card._id} card={card} controls drag />
            </motion.div>
          </Grid>
        ))}

        <AnimatePresence>
          {/* selected document */}
          {selectedDocument && (
            // overlay
            <motion.div
              onClick={() => setSelectedDocument(null)}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,0.5)",
              }}
            >
              {/* <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: "absolute",
                  inset: 0,
                }}
              >
                <motion.div
                  style={{
                    maxHeight: "100vh",
                    maxWidth: "100vw",
                    objectFit: "contain",
                    margin: "auto",
                  }}
                  layoutId={selectedDocument._id}
                >
                  <motion.img
                    style={{
                      maxHeight: "100vh",
                      maxWidth: "100vw",
                      objectFit: "contain",
                      margin: "auto",
                    }}
                    //   layoutId={selectedDocument?._id}
                    src={`/imgs/playground/${selectedDocument.sourceHighRes}`}
                    onClick={e => e.stopPropagation()}
                  />
                </motion.div>
              </motion.div> */}
              <Box
                sx={{
                  position: "absolute",
                  // inset: 20,
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

export default PlaygroundPosts;
