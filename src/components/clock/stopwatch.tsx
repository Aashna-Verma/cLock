// src/components/Stopwatch.tsx
import { useState, useRef, useEffect } from "react";
import { DoubleDigit } from "@/components/clock/clock-assets";
import { Button } from "@/components/ui/button";
import { PlayIcon, PauseIcon, RefreshCwIcon } from "lucide-react";

export default function Stopwatch() {
  // elapsed time in seconds
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Start/stop the interval when isRunning changes
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsed((e) => e + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  // Compute hrs / mins / secs
  const hrs = Math.floor(elapsed / 3600);
  const mins = Math.floor((elapsed % 3600) / 60);
  const secs = elapsed % 60;

  const handleRestart = () => {
    setElapsed(0);
    setIsRunning(false);
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-4">
      {/* Time display */}
      <div className="flex items-center justify-center gap-8 font-mono">
        <DoubleDigit digit={hrs} />
        <DoubleDigit digit={mins} />
        <DoubleDigit digit={secs} />
      </div>

      {/* Controls */}
      <div className="py-4 px-5 rounded-md flex items-center gap-8 bg-white/10 backdrop-blur-2xl">
        <Button
          className="!p-0 hover:!bg-transparent hover:scale-105"
          variant="ghost"
          onClick={handleRestart}
          aria-label="Restart"
        >
          <RefreshCwIcon className="size-10" />
        </Button>
        <Button
          className="!p-0 hover:!bg-transparent hover:scale-105"
          variant="ghost"
          onClick={() => setIsRunning(true)}
          disabled={isRunning}
          aria-label="Play"
        >
          <PlayIcon className="size-10" />
        </Button>
        <Button
          className="!p-0 hover:!bg-transparent hover:scale-105"
          variant="ghost"
          onClick={() => setIsRunning(false)}
          disabled={!isRunning}
          aria-label="Pause"
        >
          <PauseIcon className="size-10" />
        </Button>
      </div>
    </div>
  );
}