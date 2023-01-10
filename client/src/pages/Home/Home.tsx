import { Button, Container, Grid, Stack } from "@mui/material";
import React from "react";
import { PlayArrow, Search } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MovieName from "../../components/MovieName/MovieName";
import { Helmet } from "react-helmet-async";
import { formatDistance } from "date-fns";
import { fr } from "date-fns/locale";

const MotionButton = motion(Button);

const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Interférences - Court métrage intéractif</title>
      </Helmet>

      <Container>
        <Grid
          container
          sx={{
            placeContent: "center",
            placeItems: "center",
            maxHeight: "100vh",
            height: "100vh",
            overflowY: "clip",
            gap: 2,
          }}
        >
          <Grid item>
            <Stack direction='column' gap={4} mb={16}>
              <MovieName
                variant='h1'
                textAlign='center'
                sx={{
                  "@media (max-width: 600px)": {
                    fontSize: "clamp(2rem, 10vw, 3rem)",
                  },
                }}
              />
              <Stack gap={1} alignSelf='center' flexWrap='wrap'>
                <MotionButton
                  endIcon={<PlayArrow />}
                  variant='contained'
                  size='large'
                  component={Link}
                  to='/trailer'
                  sx={{
                    "@media (max-width: 600px)": {
                      width: "100%",
                    },
                  }}
                >
                  Voir le trailer
                </MotionButton>
                <Button
                  component={Link}
                  size='large'
                  to='/'
                  endIcon={<Search />}
                  sx={{
                    "@media (max-width: 600px)": {
                      width: "100%",
                    },
                  }}
                  disabled
                >
                  Disponible dans{" "}
                  {formatDistance(new Date(), new Date("2023-01-11"), {
                    locale: fr,
                  })}
                  {/* Commencer les recherches */}
                </Button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home;
