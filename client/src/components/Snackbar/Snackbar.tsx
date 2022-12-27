import React, { useState } from "react";
import { Snackbar as MuiSnackbar, Alert, Slide } from "@mui/material";
import socket from "../../lib/socket";

interface SnackbarInterface {
  msg?: string;
  isOpen: boolean;
  type?: "error" | "success";
  duration?: number;
}

const Snackbar: React.FC = () => {
  const [{ duration, msg, isOpen, type }, setSnackbar] =
    useState<SnackbarInterface>({
      isOpen: false,
    });

  socket.on("error", msg =>
    setSnackbar({ msg, isOpen: true, type: "error", duration })
  );
  socket.on("receiveToken", () =>
    setSnackbar({
      msg: "Niveau suivant",
      isOpen: true,
      type: "success",
      duration: 2000,
    })
  );

  const handleClose = () => setSnackbar(prev => ({ ...prev, isOpen: false }));

  return (
    <MuiSnackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={isOpen}
      TransitionComponent={Slide}
      onClose={handleClose}
      autoHideDuration={duration ?? 5000}
    >
      <Alert onClose={handleClose} severity={type ?? "info"}>
        {msg}
      </Alert>
    </MuiSnackbar>
  );
};

export default Snackbar;
