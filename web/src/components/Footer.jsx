import React from "react";
import {
    Container,
    AppBar, Toolbar, Typography, Button, IconButton,Box,Grid
  } from "@mui/material";
  import { styled } from "@mui/material";
  const BoxPersonalizada = styled(Box)({
    color: "white",
    background: "linear-gradient(to right bottom, #bd91de, #7371fc)",
  });
  const TypographyPer = styled(Typography)({
    color: "white",
  });
export default function Footer(){


return(
    <BoxPersonalizada sx={{ minHeight: 75,display:"flex"
}}>

    <Grid container  sx={{justifyContent: 'center',alignItems:"center"}}>
          <Grid item xs={2} >
            <TypographyPer>Contact</TypographyPer>
          </Grid>
          <Grid item xs={2} >
            <TypographyPer >Twitter</TypographyPer>
          </Grid>
          <Grid item xs={2} >
            <TypographyPer>Something</TypographyPer>
          </Grid>
          <Grid item xs={2} >
            <TypographyPer>xD</TypographyPer>
          </Grid>

        </Grid>
    </BoxPersonalizada>
)

}