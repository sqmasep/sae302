import { Grid } from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import Player from "react-player";
import { Helmet } from "react-helmet-async";

const MotionGrid = motion(Grid);

const Film: React.FC = () => {
  useEffect(() => {
    if ("ontouchstart" in window) {
      screen.orientation.lock("landscape");
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Interférences - Le film</title>
      </Helmet>

      <Grid
        container
        sx={{
          minHeight: "100vh",
          placeContent: "center",
          placeItems: "center",
        }}
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
            src='/vids/trailer.mp4'
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
    </>
  );
};

export default Film;
