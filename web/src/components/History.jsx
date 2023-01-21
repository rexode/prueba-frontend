import { Box } from "@mui/system";
import React from "react";
import {Celebration} from "@mui/icons-material";
import { Typography,Card, Grid, CardMedia } from "@mui/material";
import logo from "../assets/logo.jpg"
import {BotonPersonalizado,themeDark,themeLight} from "./Themes"
import { styled,CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function History(props) {
  const {DarkMode} = props;

    return (
      <ThemeProvider theme={DarkMode? themeLight:themeDark}>
      <CssBaseline />  

      <Box style={{  }}>
        <Grid
          container
          spacing={2}
          sx={{ p: 5 }}
          direction="row"
          alignItems="center"
        >
          <Grid item xs={12} md={6} alignItems="center">
            <CardMedia justify="center" >
              <img src={logo} alt="Logo"style={{ width: 300, height: 300 }}  />
            </CardMedia>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 4 }}>
              <Typography variant="h2" color="primary">Who are we?</Typography>
              <Typography variant="h6" color="primary">
                pepe ipsum dolor sit amet consectetur adipiscing, elit himenaeos
                praesent senectus natoque litora condimentum, montes neque
                molestie potenti egestas. Dignissim iaculis dapibus suspendisse
                ante tempus euismod torquent, nullam sed mauris fames suscipit
                platea, nibh eros tempor vel placerat montes. Porttitor aliquet
                tempor gravida eu pulvinar facilisis phasellus posuere
                suspendisse velit varius proin taciti mauris, urna at ut sodales
                maecenas litora sociis mi luctus nullam sollicitudin imperdiet
                nec. Vehicula primis sodales facilisis mollis velit tincidunt in
                nostra id dis feugiat, magna tortor ad aenean nam metus arcu
                ante cubilia vestibulum, dictum odio erat sociosqu blandit
                congue fringilla dictumst maecenas quisque.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      </ThemeProvider>
    );

}