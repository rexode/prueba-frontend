import "./App.css";
import { Button, Typography, Box, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Refresh } from "@mui/icons-material";
import { styled } from "@mui/material";
import Navbar from "./components/NavBar";
import Entrance from "./components/Entrance";
import History from "./components/History";


const BotonPersonalizado = styled(Button)({
  color: "white",
  background: "linear-gradient(to right bottom, #a594f9, #e5d9f2)",
  borderRadius: 50,
});

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#cdc1ff",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#a594f9",
      dark: "pink",
      contrastText: "#fff",
    },
    background: {
      default: "#f8f7ff",
    },
  },
  
});

function App() {
  return (
    
    <ThemeProvider theme={theme}>
      <div className="App" style={{ backgroundColor: "#f5efff" }}>
      <Navbar />
      <Entrance/>
      <Box sx={{ offset: theme.mixins.toolbar }}>
          <BotonPersonalizado color="secondary" variant="contained" disableElevation>
            <Refresh />
            Refresh
          </BotonPersonalizado>

          <BotonPersonalizado>
            personalizado
          </BotonPersonalizado>
          <BotonPersonalizado>hola</BotonPersonalizado>
          </Box>
          <History/>
        </div>
      
    </ThemeProvider>
  );
}

export default App;
