import "./App.css";
import { useEffect, useState } from "react";
import { Button, Typography, Box, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Refresh } from "@mui/icons-material";
import { styled } from "@mui/material";
import Navbar from "./components/NavBar";
import Entrance from "./components/Entrance";
import History from "./components/History";
import Lottery from "./components/Lottery";

const BotonPersonalizado = styled(Button)({
  color: "white",
  background: "linear-gradient(to right bottom, #4e54c8, #8f94fb)",
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
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  return (
    <ThemeProvider theme={theme}>
      <div className="App" style={{ backgroundColor: "#f5efff" }}>
        <Navbar/>
        <Entrance />
        <History />
        <Lottery />
      </div>
    </ThemeProvider>
  );
}

export default App;
