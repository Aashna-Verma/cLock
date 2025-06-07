import { useEffect, useState } from "react";
import { useSettings } from "@/context/SettingsContext";
import { DoubleDigit, AMPMIndicator, SecondsDisplay } from "@/components/clock/clock-assets";

function FlipClock() {
  const { settings, updateSettings } = useSettings();
  const { is24Hour, showSeconds } = settings.flipClock;

  const [time, setTime] = useState(() => {
    const now = new Date();
    return {
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds(),
    };
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime({
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative font-mono flex gap-10 items-center justify-center w-fit">
      <DoubleDigit digit={is24Hour ? time.hours : ((time.hours % 12) || 12)} />
      <DoubleDigit digit={time.minutes} />

      {!is24Hour && <AMPMIndicator hours={time.hours} />}
      {showSeconds && <SecondsDisplay seconds={time.seconds} />}
    </div>
  );
}

export default FlipClock;