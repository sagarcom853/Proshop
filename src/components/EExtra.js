import { ThemeProvider } from 'react-bootstrap'

const theme = {
  light: { background1: red, background2: green },
  dark: { background1: green, background2: blue },
}

const ThemeContext = React.createContext(theme.light)
const App = () => {
  return (
    <ThemeContext.Provider>
      <Toolbar value={theme.dark} />
    </ThemeContext.Provider>
  )
}
const Toolbar = () => {
  return (
    <div>
      <ThemeButton />
    </div>
  )
}
const ThemeButton = () => {
  const theme = useContext(ThemeContext)
  return (
    <div>
      <button style={{ background: theme.background1, color: theme.background2}}></button>
    </div>
  )
}
