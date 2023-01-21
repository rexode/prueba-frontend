import { Paper, Typography,Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { styled,CssBaseline } from "@mui/material";
import imageBackground from "../assets/paisaje.jpg"
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {BotonPersonalizado,themeDark,themeLight} from "./Themes"






export default function Entrance(props){
  const {DarkMode} = props;

return (
<ThemeProvider theme={DarkMode? themeLight:themeDark}>
<CssBaseline />  
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
      <Typography variant="h1" color="primary">
        Easy To
      </Typography>
      <Typography variant="h1" color="primary">
        Win
      </Typography>
      <Typography variant="h3" color="primary">
        3 Simple steps
      </Typography>
      <Typography variant="h4" color="primary">
        1º Connect your wallet
      </Typography>
      <Typography variant="h4" color="primary">
        2º Buy the Tickets
        <Button >
          To Lottery
        </Button>
      </Typography>
      <Typography variant="h4" color="primary">
        3º Wait for the results
        <Button >
          To Results
        </Button>
      </Typography>
      <Typography variant="h1"color="primary">Win</Typography>
      <Typography variant="h1"color="primary">Win</Typography>
    </Box>
  </Paper>
  </ThemeProvider >

);


}
