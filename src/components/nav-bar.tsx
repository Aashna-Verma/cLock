import { AlarmClockIcon, CalendarRangeIcon, ListTodoIcon, Settings2Icon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Toggle } from "@/components/ui/toggle"

function NavBar() {
  return (
    <nav className="fixed bottom-0 w-full flex justify-between px-4 py-2">
      <div id="user-preferences" className="min-w-36 flex items-center gap-3">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <Toggle value="underline" aria-label="Toggle underline">
          <Settings2Icon className="size-7" />
        </Toggle>

      </div>

      <div id="apps" className="flex items-center gap-3">
        <Toggle value="bold" aria-label="Toggle bold">
          <CalendarRangeIcon className="size-7" />
        </Toggle>
        <Toggle value="italic" aria-label="Toggle italic">
          <ListTodoIcon className="size-7" />
        </Toggle>
        <Toggle value="underline" aria-label="Toggle underline">
          <AlarmClockIcon className="size-7" />
        </Toggle>
      </div>

      <div className="min-w-36"></div>
    </nav>
  )
}

export default NavBar;