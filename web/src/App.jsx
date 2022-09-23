import "./App.css";
import { Button, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Refresh } from "@mui/icons-material";
import { makeStyles } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#9381ff",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#9381ff",
      dark: "pink",
      contrastText: "#fff",
    },
    background: {
      default: "#f8f7ff",
    },
  },
  shape: {
    borderRadius: 50,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App" style={{ backgroundColor: "#f8f7ff" }}>
        <Button color="secondary" variant="contained" disableElevation>
          <Refresh />
          Refresh
        </Button>
        <Typography variant="h1" color="initial">
          aasdfa
        </Typography>
        <Button className="prueba" variant="contained" color="secondary">
          personalizado
        </Button>
      </div>
    </ThemeProvider>
  );
}

export default App;
