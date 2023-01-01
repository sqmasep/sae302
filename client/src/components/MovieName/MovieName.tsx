import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

const MotionTypography = motion(Typography);

const MovieName: React.FC<React.ComponentProps<typeof MotionTypography>> = ({
  ...props
}) => {
  return (
    <MotionTypography
      layoutId='movie-name'
      variant='h3'
      component='h1'
      fontWeight={900}
      {...props}
    >
      Interférences
    </MotionTypography>
  );
};

export default MovieName;
