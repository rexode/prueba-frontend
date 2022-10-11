import "./App.css";
import { useEffect, useState,useRef } from "react";
import {
  Button,
  Typography,
  Box,
  Container,
  Toolbar,
  Card,
  AppBar
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Refresh } from "@mui/icons-material";
import { styled } from "@mui/material";
import Navbar from "./components/NavBar";
import Entrance from "./components/Entrance";
import History from "./components/History";
import Lottery from "./components/Lottery";
import Results from "./components/Results";
import Footer from "./components/Footer";
import { ethers } from "ethers";
import imageBackground from "./assets/paisaje.jpg"


const BotonPersonalizado = styled(Button)({
  color: "white",
  background: "linear-gradient(to right bottom, #4e54c8, #8f94fb)",
  borderRadius: 50,
  borderColor: "white",
  border: 3,
});
const NavbarPersonalizada = styled(AppBar)({
  color: "white",
  background: "linear-gradient(to right bottom, #bd91de, #7371fc)",
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
  },
});

function App() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const ref = useRef(null);


  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };



  const initConnection = async () => {
    if (typeof window.ethereum !== "undefined") {
      console.log("good");
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(tempProvider);
      console.log(provider);
      setAccount(accounts[0]);
    } else {
      console.log("install metamask");
    }
  };

  useEffect(() => {
    initConnection();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box
        className="App"
        sx={{
          backgroundImage: `url(${imageBackground})`,
          backgroundAttachment: "fixed",
        }}
      >
        <Navbar initConnection={initConnection} account={account} />
        <Entrance />
        <Toolbar
          sx={{
            background: "linear-gradient(to right bottom,#5e0055, #20005e)",
            boxShadow: 2,
          }}
        ></Toolbar>
        <History />
        <div id="lottery">
          <Lottery account={account} provider={provider} />
        </div>
        <Results account={account} provider={provider} />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
