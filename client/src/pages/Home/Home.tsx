import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { PlayArrow, Search } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionTypography = motion(Typography);

const Home: React.FC = () => {
  return (
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
            <MotionTypography variant='h1' layoutId='movie-name'>
              Interférences
            </MotionTypography>

            <Stack gap={1} alignSelf='center'>
              <Button
                onClick={() => {}}
                endIcon={<PlayArrow />}
                variant='contained'
                size='large'
              >
                Voir le film
              </Button>
              <Button component={Link} to='/playground' endIcon={<Search />}>
                Commencer les recherches
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
