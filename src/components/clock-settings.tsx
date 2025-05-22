import { useState } from "react";
import { useSettings, type Mode } from "@/context/SettingsContext";
import DraggableWindow from "@/components/draggable-window";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function ClockSettings({ onClose }: { onClose: () => void }) {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ width: 300, height: 200 });

  const { settings, updateSettings } = useSettings();
  const { is24Hour, showSeconds } = settings.flipClock;

  const [activeTab, setActiveTab] = useState<Mode>(settings.mode);

  const tabs = [
    {
      title: "FlipClock",
      value: "flipClock" as const,
      content: (
        <div className="space-y-4">
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
        <div className="p-4">
          {/* your pomodoro controls here */}
          Pomodoro settings go here
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
        <div className="flex flex-col space-y-2">
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

        <div className="flex-1 overflow-auto py-2">{ActiveContent}</div>
      </div>
    </DraggableWindow>
  );
}

export default ClockSettings;