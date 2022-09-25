import "./App.css";
import { Button, Typography,Box,Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Refresh } from "@mui/icons-material";
import {styled} from "@mui/material"
import Navbar from "./components/NavBar";


const BotonPersonalizado = styled(Button)({
  color: "white",
  background: "linear-gradient(to right bottom, #a594f9, #e5d9f2)",
  borderRadius:50,
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
  shape: {
    borderRadius: 50,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar/>
      
      <Box sx={
        {offset: theme.mixins.toolbar}
      }>
        <div className="App" style={{ backgroundColor: "#f5efff" }}>
          <Button color="secondary" variant="contained" disableElevation>
            <Refresh />
            Refresh
          </Button>
          <Typography variant="h1" color="initial">
            aasdfa
          </Typography>
          <Button
            sx={{
              color: "white",
              background: "linear-gradient(to right bottom, #a594f9, #e5d9f2)",
            }}
          >
            personalizado
          </Button>
          <BotonPersonalizado>hola</BotonPersonalizado>
        </div>
      </Box>
    </ThemeProvider>
  );
}

export default App;
