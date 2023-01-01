import { VolumeOff, VolumeUp } from "@mui/icons-material";
import { FormControlLabel, Stack, Switch } from "@mui/material";
import React from "react";
import { useSettings } from "../../contexts/SettingsProvider";

const SfxSwitch: React.FC = () => {
  const { settings, toggleSfx } = useSettings();

  return (
    <Stack gap={2} alignItems='center'>
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
    </Stack>
  );
};

export default SfxSwitch;
