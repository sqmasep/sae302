import { CircularProgress, Stack, Typography } from "@mui/material";
import React from "react";

const Loading: React.FC = () => {
  return (
    <Stack direction='column' gap={2} alignItems='center'>
      <CircularProgress />
      <Typography>Chargement!</Typography>
    </Stack>
  );
};

export default Loading;
