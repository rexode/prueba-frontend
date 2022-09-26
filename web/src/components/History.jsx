import { Box } from "@mui/system";
import React from "react";
import {Celebration} from "@mui/icons-material";
import { Typography,Card, Grid, CardMedia } from "@mui/material";
import logo from "../assets/logo.jpg"
export default function History() {
    return(
            <Grid container spacing={2} columns={16} sx={{marginTop:5 }}>
            <Grid xs={8}>
            <CardMedia >
                <img src={logo} alt="Logo" />
            </CardMedia>
            </Grid>
            <Grid xs={8}>
            <Box sx={{margin:4}}>
                <Typography variant="h2">
                    Who are we?
                </Typography>
                <Typography variant="h6">
                Lorem ipsum dolor sit amet consectetur adipiscing, elit himenaeos praesent senectus natoque litora condimentum, montes neque molestie potenti egestas. Dignissim iaculis dapibus suspendisse ante tempus euismod torquent, nullam sed mauris fames suscipit platea, nibh eros tempor vel placerat montes. Porttitor aliquet tempor gravida eu pulvinar facilisis phasellus posuere suspendisse velit varius proin taciti mauris, urna at ut sodales maecenas litora sociis mi luctus nullam sollicitudin imperdiet nec. Vehicula primis sodales facilisis mollis velit tincidunt in nostra id dis feugiat, magna tortor ad aenean nam metus arcu ante cubilia vestibulum, dictum odio erat sociosqu blandit congue fringilla dictumst maecenas quisque.

                </Typography>
            </Box>
            </Grid>
            </Grid>

    )

}