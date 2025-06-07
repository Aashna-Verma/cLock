import { useSettings } from "@/context/SettingsContext";
import FlipClock from "@/components/clock/flipclock";
import Pomodoro from "@/components/clock/pomodoro";
import Stopwatch from "@/components/clock/stopwatch";

function Clock() {
  const { settings } = useSettings();

  let ActiveView;
  switch (settings.mode) {
    case "flipClock":
      ActiveView = <FlipClock />;
      break;
    case "pomodoro":
      ActiveView = <Pomodoro />;
      break;
    case "stopwatch":
      ActiveView = <Stopwatch />;
      break;
    default:
      ActiveView = null;
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {ActiveView}
    </div>
  );
}

export default Clock;