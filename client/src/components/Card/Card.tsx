import { TurnedIn, TurnedInNot } from "@mui/icons-material";
import { Box, Checkbox } from "@mui/material";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useSavedDocuments } from "../../contexts/SavedDocumentsProvider";
import { Document } from "../../pages/Playground/Playground";

const MotionBox = motion(Box);

const Card: React.FC<
  { card: Document; controls?: boolean; imgSource?: string } & Omit<
    React.ComponentProps<typeof MotionBox>,
    "ref"
  >
> = ({
  card,
  layoutId,
  drag,
  controls = false,
  imgSource = card.sourceLowRes,
  style,
  ...props
}) => {
  const { pushUnique, remove, inArray } = useSavedDocuments();
  const [hover, setHover] = useState(false);

  const handleChange = (
    _: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    checked ? pushUnique(card) : remove(card);
  };

  return (
    <MotionBox
      {...props}
      whileHover={drag ? { scale: 1.05, rotateZ: 3 } : {}}
      whileTap={drag ? { scale: hover ? 1.05 : 0.95 } : {}}
      drag={drag}
      dragMomentum={false}
      sx={{
        position: "relative",
        maxHeight: "100%",
      }}
    >
      <motion.div style={style} layoutId={layoutId}>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            // backgroundImage: "linear-gradient(to bottom, transparent, #0005)",
          }}
        />
        <motion.img
          draggable='false'
          style={{ maxWidth: "100%", maxHeight: "100vh", objectFit: "contain" }}
          src={`/imgs/playground/${imgSource}`}
        />
      </motion.div>
      {controls && (
        <Checkbox
          icon={<TurnedInNot />}
          checked={inArray(card)}
          onChange={handleChange}
          value={card.sourceLowRes}
          onClick={e => e.stopPropagation()}
          onMouseDown={() => setHover(true)}
          onMouseUp={() => setHover(false)}
          checkedIcon={<TurnedIn />}
          sx={{ position: "absolute", bottom: 0, left: 0 }}
        />
      )}
    </MotionBox>
  );
};

export default Card;
