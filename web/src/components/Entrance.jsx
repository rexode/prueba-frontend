import { Paper, Typography,Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { styled } from "@mui/material";
import imageBackground from "../assets/paisaje.jpg"
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
  background: "linear-gradient(to right bottom,#5e0055, #20005e)",
  borderRadius: 50,
  border: 1,
});
const Entrance = ()=>{

return (
  <ThemeProvider theme={theme}>
  <Paper
    elevation={0}
    sx={{
      background: "rgba(0,0,0,0.0)",
      marginTop: 2,
      minHeight:900,
      border:0
    }}
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
  </ThemeProvider >

);


}
export default Entrance;