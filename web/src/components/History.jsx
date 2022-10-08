import { Box } from "@mui/system";
import React from "react";
import {Celebration} from "@mui/icons-material";
import { Typography,Card, Grid, CardMedia } from "@mui/material";
import logo from "../assets/logo.jpg"
export default function History() {
    return (
      <Box style={{ background: "linear-gradient(to right bottom,#37005b, #20005e)" }}>
        <Grid
          container
          spacing={2}
          sx={{ p: 5 }}
          direction="row"
          alignItems="center"
        >
          <Grid item xs={12} md={6} alignItems="center">
            <CardMedia justify="center">
              <img src={logo} alt="Logo" />
            </CardMedia>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 4 }}>
              <Typography variant="h2" sx={{color:"#4e54c8"}}>Who are we?</Typography>
              <Typography variant="h6" sx={{color:"#4e54c8"}}>
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
    );

}