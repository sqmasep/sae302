import { TurnedIn, TurnedInNot } from "@mui/icons-material";
import { Box, Checkbox } from "@mui/material";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useSavedDocuments } from "../../contexts/SavedDocumentsProvider";
import { Document } from "../../pages/Playground/Playground";

const MotionBox = motion(Box);

const Card: React.FC<{ card: Document }> = ({ card }) => {
  const { pushUnique, remove, inArray } = useSavedDocuments();
  const [hover, setHover] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    checked ? pushUnique(card) : remove(card);
  };

  return (
    <MotionBox
      whileHover={{ scale: 1.05, rotateZ: 3 }}
      whileTap={{ scale: hover ? 1.05 : 0.95 }}
      drag
      dragMomentum={false}
      sx={{ position: "relative" }}
    >
      {/* <pre>{JSON.stringify(card, null, 2)}</pre> */}

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          // backgroundImage: "linear-gradient(to bottom, transparent, #0005)",
        }}
      />
      <img draggable='false' src={`/imgs/playground/${card.sourceLowRes}`} />
      <Checkbox
        icon={<TurnedInNot />}
        checked={inArray(card)}
        onChange={handleChange}
        value={card.sourceLowRes}
        onMouseDown={() => setHover(true)}
        onMouseUp={() => setHover(false)}
        checkedIcon={<TurnedIn />}
        sx={{ position: "absolute", bottom: 0, left: 0 }}
      />
    </MotionBox>
  );
};

export default Card;
