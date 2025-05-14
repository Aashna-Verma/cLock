import Background from "./components/background"
import FlipClock from "./components/flipclock"
import NavBar from "./components/nav-bar"
import { ThemeProvider } from "@/components/theme-provider"

function App() {

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Background />
        <FlipClock />
        <NavBar />
      </ThemeProvider>
    </>
  )
}

export default App
