import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import useNbUsers from "../../hooks/useNbUsers";

const NbUsers: React.FC = () => {
  const nbUsers = useNbUsers();

  return (
    <Stack
      direction='row'
      alignItems='center'
      spacing={1}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        m: 4,
      }}
    >
      <Box
        sx={{
          borderRadius: 50,
          backgroundColor: "red",
          width: ".8rem",
          aspectRatio: "1",
        }}
      />
      <Typography>{nbUsers}</Typography>
    </Stack>
  );
};

export default NbUsers;
