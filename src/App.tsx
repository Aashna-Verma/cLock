import Background from "@/components/background"
import NavBar from "@/components/nav-bar"
import { ThemeProvider } from "@/components/theme-provider"
import { SettingsProvider } from "@/context/SettingsContext"
import Clock from "@/components/clock/clock"

function App() {

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <SettingsProvider>
          <Background />

          <Clock />

          <NavBar />
        </SettingsProvider>
      </ThemeProvider>
    </>
  )
}

export default App
