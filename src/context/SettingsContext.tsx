// src/context/SettingsContext.tsx
import React, { createContext, useContext, useState } from "react";

// 1️⃣ Define your modes
export type Mode = "flipClock" | "pomodoro" | "stopwatch";

// 2️⃣ Extend AppSettings to include mode
export type FlipClockSettingsType = {
  is24Hour: boolean;
  showSeconds: boolean;
};

export type PomodoroSettingsType = {
  workMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
};

export type AppSettings = {
  mode: Mode;                          // ← new!
  flipClock: FlipClockSettingsType;
  pomodoro: PomodoroSettingsType;
};

// 3️⃣ Update your defaults to include an initial mode
const DEFAULTS: AppSettings = {
  mode: "flipClock",                   // ← start in flipClock mode
  flipClock: { is24Hour: true, showSeconds: true },
  pomodoro: { workMinutes: 25, shortBreakMinutes: 5, longBreakMinutes: 15 },
};

const STORAGE_KEY = "app-settings";

// 4️⃣ Create context (same as before)
const SettingsContext = createContext<{
  settings: AppSettings;
  updateSettings: (patch: Partial<AppSettings>) => void;
}>({
  settings: DEFAULTS,
  updateSettings: () => { },
});

// 5️⃣ Provider (same merge logic, now including mode)
export const SettingsProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const json = localStorage.getItem(STORAGE_KEY);
      return json ? JSON.parse(json) : DEFAULTS;
    } catch {
      return DEFAULTS;
    }
  });

  const updateSettings = (patch: Partial<AppSettings>) => {
    setSettings((prev) => {
      const merged = { ...prev, ...patch };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      return merged;
    });
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

// 6️⃣ Hook
export const useSettings = () => useContext(SettingsContext);
