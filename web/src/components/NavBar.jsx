import { AppBar, Toolbar, Typography,Button, IconButton } from "@mui/material";
import {styled} from "@mui/material"
import { Celebration } from "@mui/icons-material";

import { Box } from "@mui/system";
import React from "react";
const Navbar=()=>{
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar elevation={0} position="static">
          <Toolbar>
            <IconButton sx={{color:"white"}}><Celebration/></IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              CryptoLucky
            </Typography>
            <Button disableElevation sx={{ color: "white" }}>
              Log-in
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
}
export default Navbar
