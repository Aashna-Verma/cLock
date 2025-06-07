// src/components/Pomodoro.tsx
import { useEffect, useState, useRef } from "react";
import { useSettings } from "@/context/SettingsContext";
import { DoubleDigit } from "@/components/clock/clock-assets";
import { Button } from "@/components/ui/button";

type Mode = "work" | "short" | "long";

export default function Pomodoro() {
  const { settings } = useSettings();
  const { workMinutes, shortBreakMinutes, longBreakMinutes } =
    settings.pomodoro;

  const [mode, setMode] = useState<Mode>("work");
  const [cycle, setCycle] = useState(0);          // counts completed work sessions
  const [remaining, setRemaining] = useState(0);  // seconds left

  // helper to get initial seconds for a mode
  const getSecondsFor = (m: Mode) =>
    m === "work"
      ? workMinutes * 60
      : m === "short"
        ? shortBreakMinutes * 60
        : longBreakMinutes * 60;

  // whenever mode changes, reset remaining
  useEffect(() => {
    setRemaining(getSecondsFor(mode));
  }, [mode, workMinutes, shortBreakMinutes, longBreakMinutes]);

  // tick every second
  const cycleRef = useRef(cycle);
  cycleRef.current = cycle;

  useEffect(() => {
    const id = setInterval(() => {
      setRemaining((sec) => {
        if (sec <= 0) {
          if (mode === "work") {
            const nextCycle = cycleRef.current + 1;
            setCycle(nextCycle);
            setMode(nextCycle % 4 === 0 ? "long" : "short");
          } else {
            setMode("work");
          }
          return 0;
        }
        return sec - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [mode]);

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;

  // how many work sessions have completed in the current cycle (0–3)
  const completed = cycle % 4;

  return (
    <div className="flex flex-col items-center space-y-6 p-4">
      {/* flip-style display */}
      <div className="flex items-center justify-center gap-10 font-mono">
        <DoubleDigit digit={minutes} />
        <DoubleDigit digit={seconds} />
      </div>

      {/* mode buttons */}
      <div className="flex gap-2">
        <Button
          className={`hover:scale-105 w-32 ${mode === "work" ? "text-pink-800" : "bg-white/20 backdrop-blur-2xl rounded-full "}`}
          variant={mode === "work" ? "default" : "outline"}
          onClick={() => setMode("work")}
        >
          Work
        </Button>
        <Button
          className={`hover:scale-105 w-32 ${mode === "short" ? "text-pink-800" : "bg-white/20 backdrop-blur-2xl rounded-full "}`}
          variant={mode === "short" ? "default" : "outline"}
          onClick={() => setMode("short")}
        >
          Short Break
        </Button>
        <Button
          className={`hover:scale-105 w-32 ${mode === "long" ? "text-pink-800" : "bg-white/20 backdrop-blur-2xl rounded-full "}`}
          variant={mode === "long" ? "default" : "outline"}
          onClick={() => setMode("long")}
        >
          Long Break
        </Button>
      </div>

      {/* cycle indicator: four circles */}
      <div className="flex gap-2">
        {Array.from({ length: 4 }, (_, i) => i + 1).map((n) => (
          <div
            key={n}
            className={`
              w-10 h-4 rounded-full border-1
              ${n <= completed ? "bg-white border" : "border-white/50"}
            `}
          />
        ))}
      </div>
    </div>
  );
}