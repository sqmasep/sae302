import { TurnedIn, TurnedInNot } from "@mui/icons-material";
import { Box, Checkbox } from "@mui/material";
import { motion, MotionValue } from "framer-motion";
import React from "react";
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
    x?: MotionValue<number>;
    y?: MotionValue<number>;
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
  x,
  y,
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
      whileHover={drag ? { scale: 1.05, rotateZ: 3 } : undefined}
      whileTap={drag ? { scale: saving ? 1.05 : 0.95 } : undefined}
      drag={!("ontouchstart" in window) && drag}
      dragMomentum={false}
      style={{
        ...(x && y ? { x, y } : undefined),
      }}
      {...props}
      sx={{
        position: "relative",
        maxHeight: "100%",
        outline: "none",
      }}
    >
      {/* layoutId wrapper div */}
      <motion.div style={style} layoutId={layoutId}>
        {/* overlay box causing borders visible
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 0 100%, #0001, transparent)",
          }}
        /> */}

        {/* image */}
        <motion.img
          draggable='false'
          style={{
            maxWidth: "100%",
            maxHeight: "100vh",
            objectFit: "contain",
            borderRadius: ".15em",
          }}
          src={`/imgs/playground/${imgSource}`}
        />

        {/* blur aesthetic box */}
        <Box
          sx={{
            position: "absolute",
            width: "75%",
            left: "50%",
            bottom: "-.5rem",
            transform: "translateX(-50%)",
            height: "2rem",
            borderRadius: "50%",
            backgroundImage: `url(/imgs/playground/${imgSource})`,
            filter: "blur(2rem)",
            backgroundSize: "cover",
            backgroundPosition: "bottom",
            opacity: 0.5,
            zIndex: -1,
          }}
        />

        {/* save checkbox */}
        {controls && (
          <MotionCheckbox
            icon={<TurnedInNot color='primary' />}
            checked={inArray(card)}
            onChange={handleChange}
            onTapStart={() => setSaving(true)}
            onTap={() => setSaving(false)}
            value={card.sourceLowRes}
            checkedIcon={<TurnedIn color='primary' />}
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              m: 0.5,
            }}
            color='primary'
          />
        )}
      </motion.div>
    </MotionBox>
  );
};

export default Card;
