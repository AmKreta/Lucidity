import {ThemeProvider} from "@mui/material/styles"
import Dashboard from "./pages/dashboard/dashboard.page"
import { defaultTheme } from "./themes/default"

function App() {
  return <ThemeProvider theme={defaultTheme}>
    <Dashboard />
  </ThemeProvider>
}

export default App
