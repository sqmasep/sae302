import { Grid } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import Player from "react-player";

const MotionGrid = motion(Grid);

const Film: React.FC = () => {
  return (
    <Grid
      container
      sx={{ minHeight: "100vh", placeContent: "center", placeItems: "center" }}
    >
      <MotionGrid
        sx={{
          position: "relative",
          maxWidth: "70rem",
          width: "100%",
          aspectRatio: "16/9",
          mb: 10,
        }}
        item
      >
        {/* video player */}
        <motion.video
          width='100%'
          height='100%'
          src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
          autoPlay
          controls
          style={{
            borderRadius: "1rem",
            boxShadow: "0 2em 4em 1em rgba(0, 0, 0, 0.3)",
          }}
        ></motion.video>

        {/* <Player
          pip
          width='100%'
          height='100%'
          controls
          url='https://youtu.be/esPmkiH8iNs'
        ></Player> */}
      </MotionGrid>
    </Grid>
  );
};

export default Film;
