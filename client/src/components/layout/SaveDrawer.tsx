import { Drawer } from "@mui/material";
import React from "react";

interface SaveDrawerInterface {
  isOpen: boolean;
  toggle: (forceState?: boolean) => void;
}

const SaveDrawer: React.FC<SaveDrawerInterface> = ({ isOpen, toggle }) => {
  return (
    <Drawer onClose={() => toggle(false)} anchor='right' open={isOpen}>
      ee
    </Drawer>
  );
};

export default SaveDrawer;
