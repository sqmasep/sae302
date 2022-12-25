import { TurnedIn, TurnedInNot } from "@mui/icons-material";
import { Box, Checkbox } from "@mui/material";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useSavedDocuments } from "../../contexts/SavedDocumentsProvider";
import { Document } from "../../pages/Playground/Playground";

const MotionBox = motion(Box);
const MotionCheckbox = motion(Checkbox);

const Card: React.FC<
  {
    card: Document;
    controls?: boolean;
    imgSource?: string;
    saving?: boolean;
    setSaving?: (saving: boolean) => void;
  } & Omit<React.ComponentProps<typeof MotionBox>, "ref">
> = ({
  card,
  layoutId,
  drag,
  controls = false,
  imgSource = card.sourceLowRes,
  style,
  saving,
  setSaving = () => {},
  ...props
}) => {
  const { pushUnique, remove, inArray } = useSavedDocuments();
  const handleChange = (
    _: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    checked ? pushUnique(card) : remove(card);
  };

  return (
    // draggable box
    <MotionBox
      whileHover={drag ? { scale: 1.05, rotateZ: 3 } : {}}
      whileTap={drag ? { scale: saving ? 1.05 : 0.95 } : {}}
      drag={drag}
      dragMomentum={false}
      {...props}
      sx={{
        position: "relative",
        maxHeight: "100%",
      }}
    >
      {/* layoutId wrapper div */}
      <motion.div style={style} layoutId={layoutId}>
        {/* overlay box */}
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
      {/* save checkbox */}
      {controls && (
        <MotionCheckbox
          icon={<TurnedInNot />}
          checked={inArray(card)}
          onChange={handleChange}
          onTapStart={() => setSaving(true)}
          onTap={() => setSaving(false)}
          value={card.sourceLowRes}
          checkedIcon={<TurnedIn />}
          sx={{ position: "absolute", bottom: 0, left: 0 }}
        />
      )}
    </MotionBox>
  );
};

export default Card;
