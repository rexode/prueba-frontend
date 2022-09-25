import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { styled } from "@mui/material";
import {
  Celebration,
  Twitter,
  Attachment,
  LocalActivity,
} from "@mui/icons-material";

import { Box } from "@mui/system";
import React from "react";
const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar elevation={0} position="static">
        <Toolbar>
          <IconButton sx={{ color: "white" }}>
            <Celebration />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CryptoLucky
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "Right",
              textAlign: "center",
            }}
          >
            <Button disableElevation sx={{ color: "white" }}>
              <Twitter />
              <Typography sx={{ minWidth: 100 }}>Twitter</Typography>{" "}
            </Button>
            <Button disableElevation sx={{ color: "white" }}>
              <Attachment />
              <Typography sx={{ minWidth: 100 }}>WhitePaper</Typography>
            </Button>
            <Button disableElevation sx={{ color: "white" }}>
              <LocalActivity />
              <Typography sx={{ minWidth: 100 }}>To Lottery</Typography>
            </Button>
          </Box>
          <Button disableElevation sx={{ color: "white" }}>
            <Typography fontSize={16}>Log-in</Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Navbar;
