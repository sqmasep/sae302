import {
  Box,
  Chip,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import Player from "react-player";
import { Helmet } from "react-helmet-async";
import { Home } from "@mui/icons-material";
import { Link } from "react-router-dom";
import actors from "../../data/actors";
import helped from "../../data/helped";

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

      <IconButton
        size='large'
        sx={{ m: 4, position: "absolute", zIndex: 999, color: "#777" }}
        component={Link}
        to='/'
      >
        <Home />
      </IconButton>
      <Container>
        <MotionGrid
          sx={{
            position: "relative",
            maxWidth: "70rem",
            width: "100%",
            mx: "auto",
            aspectRatio: "16/9",
            my: 10,
          }}
          item
        >
          {/* video player */}
          {/* <motion.video
            width='100%'
            height='100%'
            src='/vids/trailer.mp4'
            autoPlay
            controls
            style={{
              borderRadius: "1rem",
              boxShadow: "0 2em 4em 1em rgba(0, 0, 0, 0.3)",
            }}
          /> */}
          <Player
            pip
            width='100%'
            height='100%'
            controls
            url='https://youtu.be/esPmkiH8iNs'
          />
          <Typography
            sx={{ mt: 6, color: "#666", maxWidth: 700, marginInline: "auto" }}
            textAlign='center'
            fontSize={18}
          >
            Interférences est un court-métrage réalisé par des étudiants de BUT
            MMI qui raconte l’histoire de Gabriel, un jeune homme à la vie
            tranquille qui commence soudainement à vivre des expériences
            étranges.
          </Typography>

          <Stack mt={16} gap={4} direction='column'>
            <Typography variant='h3' component='h2'>
              Les acteurs
            </Typography>

            <Grid container spacing={4}>
              {actors.map(actor => (
                <MotionGrid
                  key={actor.name}
                  initial={{ opacity: 0, clipPath: "circle(75% at 50% 50%)" }}
                  whileInView={{
                    opacity: 1,
                    clipPath: "circle(100% at 50% 50%)",
                  }}
                  transition={{ duration: 0.5 }}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                >
                  <Stack direction='column' gap={1} alignItems='center'>
                    <img src={actor.imgSrc} />
                    <Stack gap={1} alignItems='center'>
                      <Chip label={actor.role} />
                      <Typography
                        variant='h5'
                        component='h2'
                        textAlign='center'
                      >
                        {actor.name}
                      </Typography>
                    </Stack>
                  </Stack>
                </MotionGrid>
              ))}
            </Grid>

            <Stack mt={16} gap={4} direction='column'>
              <Typography variant='h3' component='h2'>
                Remerciements
              </Typography>
              {helped.map(helper => (
                <Typography key={helper} variant='body1'>
                  {helper}
                </Typography>
              ))}
            </Stack>
          </Stack>
        </MotionGrid>
      </Container>
    </>
  );
};

export default Film;
