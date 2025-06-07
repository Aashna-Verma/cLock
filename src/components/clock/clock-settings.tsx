import { useState } from "react";
import { useSettings, type Mode } from "@/context/SettingsContext";
import DraggableWindow from "@/components/draggable-window";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function ClockSettings({ onClose }: { onClose: () => void }) {
  const { settings, updateSettings } = useSettings();


  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ width: 400, height: 200 });

  // flipclock settings
  const { is24Hour, showSeconds } = settings.flipClock;

  // pomodoro settings
  const { workMinutes, shortBreakMinutes, longBreakMinutes } = settings.pomodoro;
  const [work, setWork] = useState(workMinutes);
  const [shortBr, setShortBr] = useState(shortBreakMinutes);
  const [longBr, setLongBr] = useState(longBreakMinutes);

  const [activeTab, setActiveTab] = useState<Mode>(settings.mode);

  const tabs = [
    {
      title: "FlipClock",
      value: "flipClock" as const,
      content: (
        <div className="space-y-4 py-2">
          <div className="flex items-center space-x-2">
            <Switch
              id="24hr-mode"
              checked={is24Hour}
              onCheckedChange={(val) =>
                updateSettings({
                  flipClock: { ...settings.flipClock, is24Hour: val },
                })
              }
            />
            <Label htmlFor="24hr-mode">24-Hour Mode</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="show-seconds"
              checked={showSeconds}
              onCheckedChange={(val) =>
                updateSettings({
                  flipClock: { ...settings.flipClock, showSeconds: val },
                })
              }
            />
            <Label htmlFor="show-seconds">Show Seconds</Label>
          </div>
        </div>
      ),
    },
    {
      title: "Pomodoro",
      value: "pomodoro" as const,
      content: (
        <div className="p-1 pr-0 space-y-2">
          {/** Work Length **/}
          <div className="flex items-center space-x-2">
            <Input
              className="w-12 [&::-webkit-inner-spin-button]:appearance-none"
              id="work-length"
              type="number"
              value={work}
              onChange={(e) => setWork(parseInt(e.target.value))}
              onBlur={() =>
                work < 0
                  ? setWork(1)
                  : work > 60
                    ? setWork(60)
                    :
                    updateSettings({
                      pomodoro: { ...settings.pomodoro, workMinutes: work },
                    })
              }
            />
            <Label htmlFor="work-length">Work Length (min)</Label>
          </div>

          {/** Short Break **/}
          <div className="flex items-center space-x-2">
            <Input
              className="w-12 [&::-webkit-inner-spin-button]:appearance-none"
              id="short-break"
              type="number"
              value={shortBr}
              onChange={(e) => setShortBr(parseInt(e.target.value))}
              onBlur={() =>
                shortBr < 0
                  ? setShortBr(1)
                  : shortBr > 60
                    ? setShortBr(60)
                    :
                    updateSettings({
                      pomodoro: { ...settings.pomodoro, shortBreakMinutes: shortBr },
                    })
              }
            />
            <Label htmlFor="short-break">Short Break (min)</Label>
          </div>

          {/** Long Break **/}
          <div className="flex items-center space-x-2">
            <Input
              className="w-12 [&::-webkit-inner-spin-button]:appearance-none"
              id="long-break"
              type="number"
              value={longBr}
              onChange={(e) => setLongBr(parseInt(e.target.value))}
              onBlur={() =>
                longBr < 0
                  ? setLongBr(1)
                  : longBr > 60
                    ? setLongBr(60)
                    :
                    updateSettings({
                      pomodoro: { ...settings.pomodoro, longBreakMinutes: longBr },
                    })
              }
            />
            <Label htmlFor="long-break">Long Break (min)</Label>
          </div>
        </div>
      ),
    },
    {
      title: "Stopwatch",
      value: "stopwatch" as const,
      content: (
        <div className="p-4">
          {/* your stopwatch controls here */}
          Stopwatch settings go here
        </div>
      ),
    },
  ];

  // Find the currently active tab’s content
  const ActiveContent = tabs.find((t) => t.value === activeTab)!.content;

  return (
    <DraggableWindow
      id="clock"
      title="clock-settings.exe"
      position={position}
      size={size}
      onDragStop={(_, d) => setPosition({ x: d.x, y: d.y })}
      onResizeStop={(_, __, ref, ___, newPos) => {
        setSize({
          width: parseInt(ref.style.width, 10),
          height: parseInt(ref.style.height, 10),
        });
        setPosition(newPos);
      }}
      onClose={onClose}
    >
      <div className="flex gap-2">
        {/* Tab buttons */}
        <div className="p-1 flex flex-col space-y-2">
          {tabs.map((tab) => (
            <Button
              className={`hover:scale-105 w-32 ${activeTab === tab.value ? "text-pink-800" : "rounded-full "}`}
              key={tab.value}
              variant={activeTab === tab.value ? "default" : "outline"}
              onClick={() => {
                setActiveTab(tab.value)
                updateSettings({ mode: tab.value });
              }}
            >
              {tab.title}
            </Button>
          ))}
        </div>

        <div className="w-px rounded bg-border self-stretch" />

        <div className="flex-1 overflow-auto">{ActiveContent}</div>
      </div>
    </DraggableWindow>
  );
}

export default ClockSettings;