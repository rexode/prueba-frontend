import { Paper, Typography,Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { styled } from "@mui/material";
import imageBackground from "../assets/imageBackground.jpg"
import { createTheme, ThemeProvider } from "@mui/material/styles";



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

const BotonPersonalizado = styled(Button)({
    color: "#f5efff",
    background: "linear-gradient(to right bottom, #4e54c8, #8f94fb)",
    borderRadius: 50,
    border:1  ,
  });
const Entrance = ()=>{

return (
  <Paper
    elevation={0}
    sx={{ backgroundImage: `url(${imageBackground})`, marginTop: 2 }}
    variant="outlined"
    square
  >
    <Box>
      <Typography variant="h1" sx={{ color: "white" }}>
        Easy To
      </Typography>
      <Typography variant="h1" sx={{ color: "white" }}>
        Win
      </Typography>
      <Typography variant="h3" sx={{ color: "white" }}>
        3 Simple steps
      </Typography>
      <Typography variant="h4" sx={{ color: "white" }}>
        1º Connect your wallet
      </Typography>
      <Typography variant="h4" sx={{ color: "white" }}>
        2º Buy the Tickets
        <BotonPersonalizado sx={{ marginLeft: 4, border: 3 }}>
          To Lottery
        </BotonPersonalizado>
      </Typography>
      <Typography variant="h4" sx={{ color: "white" }}>
        3º Wait for the results
        <BotonPersonalizado sx={{ marginLeft: 4, border: 3 }}>
          To Results
        </BotonPersonalizado>
      </Typography>
      <Typography variant="h1">Win</Typography>
      <Typography variant="h1">Win</Typography>
    </Box>
  </Paper>
);


}
export default Entrance;