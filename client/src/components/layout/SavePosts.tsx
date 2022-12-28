import { Save } from "@mui/icons-material";
import { Box, Fab } from "@mui/material";
import React from "react";
import useToggle from "../../hooks/useToggle";
import SaveDrawer from "./SaveDrawer";

const SavePosts: React.FC = () => {
  const [isOpen, toggle] = useToggle(false);

  return (
    <>
      <SaveDrawer toggle={toggle} isOpen={isOpen} />
      <Box sx={{ position: "relative", zIndex: 1050 }}>
        <Fab
          sx={{ position: "fixed", bottom: 0, right: 0, m: 4, zIndex: 1050 }}
          color='primary'
          onClick={() => toggle()}
        >
          <Save />
        </Fab>
      </Box>
    </>
  );
};

export default SavePosts;
