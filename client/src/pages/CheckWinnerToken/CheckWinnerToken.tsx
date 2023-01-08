import { Box, Button, Container, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

const CheckWinnerToken: React.FC = () => {
  const [reveal, setReveal] = useState(false);
  const [copied, setCopied] = useState(false);
  const winnerToken = localStorage.getItem("interferences-winner-token");

  const handleReveal = () => setReveal(true);
  const handleCopy = () => {
    navigator.clipboard.writeText(winnerToken ?? "");
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  if (winnerToken === "false" || !winnerToken)
    return <>Visiblement, tu n'as pas de token gagnant</>;

  return (
    <Container>
      <Box mt={16}>
        <Typography>
          {winnerToken === "false" || !winnerToken ? (
            "Visiblement, tu n'as pas de token gagnant"
          ) : (
            <Stack direction='column' alignItems='start' gap={2}>
              <Button onClick={handleReveal} variant='outlined'>
                Révéler le token
              </Button>
              {reveal && (
                <>
                  <Typography>{winnerToken}</Typography>
                  <Button variant='text' onClick={handleCopy}>
                    {copied ? "Copié !" : "Copier le token"}
                  </Button>
                </>
              )}
            </Stack>
          )}
        </Typography>
      </Box>
    </Container>
  );
};

export default CheckWinnerToken;
