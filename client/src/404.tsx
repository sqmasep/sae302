import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const NotFound: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Interférences - 404 Page non trouvée</title>
      </Helmet>

      <Container>
        <Grid
          container
          sx={{
            minHeight: "100vh",
            placeContent: "center",
            placeItems: "center",
          }}
        >
          <Grid item>
            <Stack direction='column' mb={16} alignItems='center' gap={2}>
              <Typography variant='h1' textAlign='center'>
                404.. Tu t'es perdu?
              </Typography>
              <Button to='/' component={Link} size='large'>
                Je retourne à l'accueil !
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default NotFound;
