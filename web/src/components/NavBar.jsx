import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  ListItem,
  List,
  Drawer,
  useMediaQuery,
  useTheme,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  
} from "@mui/material";
import { styled } from "@mui/material";
import {
  Celebration,
  Twitter,
  Attachment,
  LocalActivity,
  Menu,
  AcUnit,
  AirlineSeatFlat,
} from "@mui/icons-material";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

import { Box } from "@mui/system";
import React from "react";
import App from "../App";
import { Link } from "react-scroll";

const NavbarPersonalizada = styled(AppBar)({
  color: "white",
  background: "rgba(0,0,0,0.0)",
});

export default function Navbar(props) {
  const [provider, setProvider] = useState(null);
  const { initConnection, account } = props;

  const DrawerComponent = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    return (
      <>
        <Drawer
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          PaperProps={{
            sx: {
              background: "linear-gradient(to right bottom,#5e0055, #20005e)",
              color: "white",
            },
          }}
        >
          <List>
            {["Twitter", "Whitepaper", "Lottery"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index == 1 ? (
                      <Button
                        disableElevation
                        href="https://Twitter.com"
                        sx={{ color: "white", m: 3 }}
                      >
                        <Twitter />
                        <Typography sx={{ minWidth: 100 }}>
                          Twitter
                        </Typography>{" "}
                      </Button>
                    ) : (
                      <>
                        {index == 2 ? (
                          <Button
                            disableElevation
                            href="https://Twitter.com"
                            sx={{ color: "white", m: 3 }}
                          >
                  <Attachment />
                            <Typography sx={{ minWidth: 100 }}>
                              Twitter
                            </Typography>{" "}
                          </Button>
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
          <Menu sx={{ color: "white" }} />
        </IconButton>
      </>
    );
  };

  const theme = useTheme();
  const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      {isMobile ? (
        <Box>
          <NavbarPersonalizada elevation={0} position="fixed">
            <Toolbar>
              <Box sx={{ flexDirection: "row", display: "flex", flexGrow: 1 }}>
                <DrawerComponent />
                <IconButton sx={{ color: "white" }}>
                  <Celebration />
                </IconButton>
                <Typography variant="h6" component="div">
                  CryptoLucky
                </Typography>
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
                <Typography>
                  ...{account.substring(account.length - 7)}
                </Typography>
              )}
            </Toolbar>
          </NavbarPersonalizada>
          <Offset />
        </Box>
      ) : (
        <Box>
          <NavbarPersonalizada elevation={0} position="fixed">
            <Toolbar>
              <Box sx={{ flexDirection: "row", display: "flex" }}>
                <IconButton sx={{ color: "white" }}>
                  <Celebration />
                </IconButton>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ marginRight: 4 }}
                >
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
                <Button
                  disableElevation
                  href="https://Twitter.com"
                  sx={{ color: "white", m: 3 }}
                >
                  <Twitter />
                  <Typography sx={{ minWidth: 100 }}>Twitter</Typography>{" "}
                </Button>
                <Button disableElevation sx={{ color: "white", m: 3 }}>
                  <Attachment />
                  <Typography sx={{ minWidth: 100 }}>WhitePaper</Typography>
                </Button>
                <Button disableElevation sx={{ color: "white", m: 3 }}>
                  <LocalActivity />
                  <Link
                    activeClass="active"
                    to="lottery"
                    spy={true}
                    smooth={true}
                  >
                    <Typography sx={{ minWidth: 100 }}>To Lottery</Typography>
                  </Link>
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
                <Typography>
                  ...{account.substring(account.length - 7)}
                </Typography>
              )}
            </Toolbar>
          </NavbarPersonalizada>
          <Offset />
        </Box>
      )}
    </>
  );
}
