import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { styled } from "@mui/material";
import {
  Celebration,
  Twitter,
  Attachment,
  LocalActivity,
} from "@mui/icons-material";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

import { Box } from "@mui/system";
import React from "react";
import App from "../App";

const NavbarPersonalizada = styled(AppBar)({
  color: "white",
  background: "linear-gradient(to right bottom, #4e54c8, #8f94fb)",
});


export default function Navbar(props) {
  const [provider, setProvider] = useState(null);
  const{initConnection,account}=props;


  const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

  return (
    <Box>
      <NavbarPersonalizada elevation={0} position="fixed">
        <Toolbar>
          <Box sx={{ flexDirection: "row", display: "flex", flexGrow: 1 }}>
            <IconButton sx={{ color: "white" }}>
              <Celebration />
            </IconButton>
            <Typography variant="h6" component="div">
              CryptoLucky
            </Typography>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "Right",
              textAlign: "center",
            }}
          >
            <Button disableElevation sx={{ color: "white", m: 3 }}>
              <Twitter />
              <Typography sx={{ minWidth: 100 }}>Twitter</Typography>{" "}
            </Button>
            <Button disableElevation sx={{ color: "white", m: 3 }}>
              <Attachment />
              <Typography sx={{ minWidth: 100 }}>WhitePaper</Typography>
            </Button>
            <Button disableElevation sx={{ color: "white", m: 3 }}>
              <LocalActivity />
              <Typography sx={{ minWidth: 100 }}>To Lottery</Typography>
            </Button>
          </Box>

          {account == null ? (
            <Button
              disableElevation
              sx={{ color: "white" }}
              onClick={initConnection}
            >
              <Typography fontSize={16}>Log-in</Typography>
            </Button>
          ) : (
            <Typography>...{account.substring(account.length - 7)}</Typography>
          )}
        </Toolbar>
      </NavbarPersonalizada>
      <Offset />
    </Box>
  );
}
