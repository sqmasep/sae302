import { VolumeOff, VolumeUp } from "@mui/icons-material";
import { FormControlLabel, Stack, Switch } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import { useSettings } from "../../contexts/SettingsProvider";

const MotionStack = motion(Stack);

const SfxSwitch: React.FC<React.ComponentProps<typeof MotionStack>> = ({
  ...props
}) => {
  const { settings, toggleSfx } = useSettings();

  return (
    <MotionStack gap={2} alignItems='center' {...props}>
      <FormControlLabel
        label={settings.sfx ? <VolumeUp /> : <VolumeOff />}
        control={
          <Switch
            sx={{ mb: 0.75 }}
            checked={settings.sfx}
            onChange={() => toggleSfx()}
          />
        }
      />
    </MotionStack>
  );
};

export default SfxSwitch;
