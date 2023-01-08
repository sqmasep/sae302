import React, { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface Settings {
  sfx: boolean;
}

interface Values {
  settings: Settings;
  toggleSfx: (force?: boolean) => void;
  playRandomSfx: () => void;
}

const SettingsContext = createContext<Values>({
  settings: { sfx: false },
  toggleSfx: () => {},
  playRandomSfx: () => {},
});

const NUMBER_OF_SFX = 22;

const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useLocalStorage<Settings>(
    "interferences-settings",
    { sfx: false }
  );

  const toggleSfx = (force?: boolean) =>
    setSettings(prev => ({ ...prev, sfx: force ?? !prev.sfx }));

  const playRandomSfx = () => {
    if (!settings.sfx) return;
    const sfx = new Audio(
      `/sfx/paper/paper${Math.floor(Math.random() * NUMBER_OF_SFX) + 1}.wav`
    );
    sfx.play();
  };

  return (
    <SettingsContext.Provider value={{ settings, toggleSfx, playRandomSfx }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
export default SettingsProvider;
