import "./App.css";
import { useEffect, useState } from "react";
import { Button, Typography, Box, Container, Toolbar, Card } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Refresh } from "@mui/icons-material";
import { styled } from "@mui/material";
import Navbar from "./components/NavBar";
import Entrance from "./components/Entrance";
import History from "./components/History";
import Lottery from "./components/Lottery";
import Results from "./components/Results";
import { ethers } from "ethers";


const BotonPersonalizado = styled(Button)({
  color: "white",
  background: "linear-gradient(to right bottom, #4e54c8, #8f94fb)",
  borderRadius: 50,
  borderColor :"white",
  border:3 ,
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
      <div className="App" style={{ backgroundColor: "#f5efff" }}>
        <Navbar initConnection={initConnection} account={account} />
        <Entrance />
        <Toolbar
          sx={{
            background: "linear-gradient(to right bottom, #4e54c8, #8f94fb)",
            boxShadow: 2,
          }}
        ></Toolbar>
        <History />
        <Lottery account={account} provider={provider} />
        <Results account={account} provider={provider}/>
        <Box sx={{background:'linear-gradient(to bottom right, #fe6b8b 30%, #ff8e53 90%)', width: 1,
        height: 300}}></Box>
      </div>


    </ThemeProvider>
  );
}

export default App;
