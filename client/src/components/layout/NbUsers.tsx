import { Box, Stack, Tooltip, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import useNbUsers from "../../hooks/useNbUsers";

const MotionTypography = motion(Typography);

const NbUsers: React.FC = () => {
  const nbUsers = useNbUsers();

  return (
    <Tooltip
      title={`${nbUsers} personne${nbUsers > 1 ? "s" : ""} connectée${
        nbUsers > 1 ? "s" : ""
      }`}
    >
      <Stack
        direction='row'
        alignItems='center'
        gap={1}
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          m: 4,
          zIndex: 1048,
        }}
      >
        <Box
          sx={{
            borderRadius: 50,
            backgroundColor: "red",
            width: ".8em",
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
    </Tooltip>
  );
};

export default NbUsers;
