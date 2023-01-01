import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { PlayArrow, Search } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MovieName from "../../components/MovieName/MovieName";
import { Helmet } from "react-helmet-async";

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
            height: "100vh",
            gap: 2,
          }}
        >
          <Grid item>
            <Stack direction='column' gap={4}>
              <MovieName
                variant='h1'
                textAlign='center'
                sx={{
                  "@media (max-width: 600px)": {
                    fontSize: "2.5rem",
                  },
                }}
              />
              <Stack gap={1} alignSelf='center' flexWrap='wrap'>
                <MotionButton
                  layoutId='video'
                  endIcon={<PlayArrow />}
                  variant='contained'
                  size='large'
                  component={Link}
                  to='/film'
                  sx={{
                    "@media (max-width: 600px)": {
                      width: "100%",
                    },
                  }}
                >
                  Voir le film
                </MotionButton>
                <Button
                  component={Link}
                  size='large'
                  to='/playground'
                  endIcon={<Search />}
                  sx={{
                    "@media (max-width: 600px)": {
                      width: "100%",
                    },
                  }}
                >
                  Commencer les recherches
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
