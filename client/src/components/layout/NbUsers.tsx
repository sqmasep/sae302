import { Box, Stack, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import useNbUsers from "../../hooks/useNbUsers";

const MotionTypography = motion(Typography);

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
        zIndex: 1050,
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
      <AnimatePresence mode='wait'>
        <MotionTypography
          initial={{ y: 5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
          key={nbUsers}
        >
          {nbUsers}
        </MotionTypography>
      </AnimatePresence>
    </Stack>
  );
};

export default NbUsers;
