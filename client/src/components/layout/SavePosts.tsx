import { Save } from "@mui/icons-material";
import { Box, Fab } from "@mui/material";
import React from "react";
import useToggle from "../../hooks/useToggle";
import SaveDrawer from "./SaveDrawer";

const SavePosts: React.FC = () => {
  const [isOpen, toggle] = useToggle(false);

  return (
    <Box>
      <SaveDrawer toggle={toggle} isOpen={isOpen} />
      <Box>
        <Fab
          color='primary'
          sx={{ position: "fixed", bottom: 0, right: 0, m: 4 }}
          onClick={toggle}
        >
          <Save />
        </Fab>
      </Box>
    </Box>
  );
};

export default SavePosts;
