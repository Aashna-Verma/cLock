import { AlarmClockIcon, CalendarRangeIcon, ListTodoIcon, Settings2Icon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Toggle } from "@/components/ui/toggle"
import ClockSettings from "./clock/clock-settings";
import { useState } from "react";

function NavBar() {
  const [isUserSettingsOpen, setIsUserSettingsOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isTodoOpen, setIsTodoOpen] = useState(false);
  const [isClockOpen, setIsClockOpen] = useState(false);

  return (
    <>
      <nav className="fixed bottom-0 w-full flex justify-between px-4 py-2">
        <div id="user-preferences" className="min-w-36 flex items-center gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <Toggle pressed={isUserSettingsOpen} onPressedChange={setIsUserSettingsOpen} aria-label="Toggle user settings">
            <Settings2Icon className="size-7" />
          </Toggle>

        </div>

        <div id="apps" className="flex items-center gap-3">
          <Toggle pressed={isCalendarOpen} onPressedChange={setIsCalendarOpen} aria-label="Toggle calendar settings">
            <CalendarRangeIcon className="size-7" />
          </Toggle>
          <Toggle pressed={isTodoOpen} onPressedChange={setIsTodoOpen} aria-label="Toggle toto settings">
            <ListTodoIcon className="size-7" />
          </Toggle>
          <Toggle pressed={isClockOpen} onPressedChange={setIsClockOpen} aria-label="Toggle clock settings" >
            <AlarmClockIcon className="size-7" />
          </Toggle>
        </div>

        <div className="min-w-36"></div>
      </nav>

      {isUserSettingsOpen && (
        <ClockSettings onClose={() => setIsUserSettingsOpen(false)} />
      )}

      {isCalendarOpen && (
        <ClockSettings onClose={() => setIsCalendarOpen(false)} />
      )}

      {isTodoOpen && (
        <ClockSettings onClose={() => setIsTodoOpen(false)} />
      )}

      {isClockOpen && (
        <ClockSettings onClose={() => setIsClockOpen(false)} />
      )}


    </>
  )
}

export default NavBar;