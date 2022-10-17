import React from "react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import {
  Button,
  Typography,
  Card,
  Grid,
  Alert,
  Snackbar,
  useMediaQuery,
  ButtonGroup,
  Divider,
} from "@mui/material";
import { Box } from "@mui/system";
import { Refresh, Add, Remove } from "@mui/icons-material";
import abi from "../abi/abi.json";
import { styled } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#4e54c8",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#a594f9",
      dark: "pink",
      contrastText: "#fff",
    },
  },
});
const TypographyPer = styled(Typography)({
  color: "white",
});

export default function Lottery(props) {
  const [Nwinners, setNwinners] = useState("Refresh");
  const [Prize, setPrize] = useState("Refresh");
  const [MaxTickets, setMaxTickets] = useState("Refresh");
  const [TicktetsLeft, setTicktetsLeft] = useState("Refresh");
  const [MaxTicketsPlayers, setMaxTicketsPlayers] = useState("Refresh");
  const [CostTicket, setCostTicket] = useState("Refresh");
  const [IdGame, setIdGame] = useState("Refresh");
  const [Pool, setPool] = useState("Refresh");
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [buttonState, setButtonState] = useState("loaded");
  const [active, setActive] = useState(false);
  const { account, provider } = props;
  const [error, setError] = useState("succesfull");
  const [open, setOpen] = useState(false);
  const [Success, setSuccess] = useState(false);

  const [NTickets, setNTickets] = useState(parseInt(0));
  const [TotalTicketsUser, setTotalTicketsUser] = useState("Refresh");
  let PercentageWinners = [
    [],
    [0.8],
    [0.6, 0.2],
    [0.5, 0.2, 0.1],
    [0.5, 0.1, 0.1, 0.05],
    [0.5, 0.1, 0.1, 0.05, 0.05],
  ];

  const Aeth = 10 ** 18;

  const BotonPersonalizado = styled(Button)({
    color: "white",
    background: "rgba(0,0,0,0.0)",
    borderRadius: 50,
    border: 1,
  });

  const getInfoContract = async () => {
    if (provider == null) {
      setError("Connect to Blockchain");
      setOpen(true);
    } else {
      setButtonState("loading");
      const contract = new ethers.Contract(
        "0x98A66BC886cA0B85E8188E2b6191E04DCb7aa31e",
        abi,
        provider
      );

      const temIdGame = await contract.idGame();
      console.log(temIdGame.toString());
      setIdGame(parseInt(temIdGame));

      const temMaxTicketsPerPlayer = await contract.maxTicketsPlayer();
      console.log(temMaxTicketsPerPlayer.toString());
      setMaxTicketsPlayers(parseInt(temMaxTicketsPerPlayer));

      const temNwinners = await contract.Nwinners(temIdGame);
      console.log(temNwinners.toString());
      setNwinners(parseInt(temNwinners));

      const temCost = (await contract.costTicket()) / Aeth;
      console.log(temCost.toString());
      setCostTicket(temCost);

      const temPrize = (await contract.prize()) / Aeth;
      console.log(temPrize.toString());
      setPrize(temPrize);

      const temPool = (await contract.pool(temIdGame)) / Aeth;
      console.log(temPool.toString());
      setPool(temPool);

      const temMaxTickets = await contract.maxTickets();
      console.log(temMaxTickets.toString());
      setMaxTickets(parseInt(temMaxTickets));

      const temTotalTicket = await contract.totalTickets();
      console.log(parseInt(temMaxTickets) - parseInt(temTotalTicket));
      setTicktetsLeft(parseInt(temMaxTickets) - parseInt(temTotalTicket));

      const temActive = await contract.active();
      console.log(temActive.toString());
      setActive(temActive);

      const temTotalTicketUser = await contract.NTicketsOwner(account);
      console.log(temTotalTicketUser.toString());
      setTotalTicketsUser(parseInt(temTotalTicketUser));
      setNTickets(parseInt(0));
      setButtonState("loaded");
    }
  };
  function showLottery() {
    let PrizeWinners = [];
    for (let i = 0; i < Nwinners; i++) {
      PrizeWinners.push(
        i +
          1 +
          "º Premio: " +
          (Pool * PercentageWinners[Nwinners][i]).toFixed(3).toString()
      );
    }

    return (
      <ThemeProvider theme={theme}>
        {IdGame.toString() === "Refresh" ? (
          <Card
            raised
            sx={{
              minHeight: 400,
              minWidth: 300,
              display: "flex",
              background: "rgba(0,0,0,0.0)",
              border: 4,
              color: "white",
              margin: 3,
            }}
            elevation={0}
          >
            <Grid
              container
              sx={{
                flexDirection: "columns",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid item>
                <TypographyPer variant="h1" sx={{ flexGrow: 1 }}>
                  Refresh Data
                </TypographyPer>
              </Grid>
            </Grid>
          </Card>
        ) : (
          <Card
            raised
            sx={{
              width: "50%",
              minWidth: 300,
              background: "rgba(0,0,0,0.0)",
              border: 4,
              color: "white",
              margin: 3,
            }}
            elevation={0}
          >
            <Grid
              container
              alignItems="stretch"
              justifyContent={"center"}
              direction="column"
              rowSpacing={1}
            >
              <Grid item xs={12}>
                <Grid
                  container
                  alignItems="center"
                  direction="row"
                  justifyContent={"space-evenly"}
                >
                  <Grid item sx={6} xs={{ minWidth: 300 }}>
                    <Grid
                      container
                      alignItems="center"
                      justifyContent={"center"}
                      direction="column"
                      rowSpacing={1}
                      sx={{ m: 1 }}
                    >
                      <Grid item>
                        <TypographyPer variant="h2">Info</TypographyPer>
                      </Grid>
                      <Grid item>
                        <TypographyPer variant="h5">
                          ID of the Game: {IdGame}
                        </TypographyPer>
                      </Grid>
                      <Grid item>
                        <TypographyPer variant="h5">
                          Number of Winners: {Nwinners}
                        </TypographyPer>
                      </Grid>
                      <Grid item xs={12}>
                        <TypographyPer variant="h5">
                          Ticket cost: {CostTicket}Eth
                        </TypographyPer>
                      </Grid>
                    </Grid>
                  </Grid>

                  {!isMobile ? (
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{ bgcolor: "white" }}
                      variant="middle"
                    />
                  ) : (
                    <></>
                  )}

                  <Grid item sx={6}>
                    <Grid
                      container
                      alignItems="center"
                      justifyContent={"center"}
                      direction="column"
                      rowSpacing={1}
                      sx={{ m: 1 }}
                    >
                      <Grid item>
                        <TypographyPer variant="h2">Prizes</TypographyPer>
                      </Grid>
                      {PrizeWinners.map((winner) => (
                        <Grid item xs={2}>
                          <TypographyPer color="primary" variant="h5">
                            {winner}Eth{" "}
                          </TypographyPer>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {!isMobile ? (
                <Divider flexItem sx={{ bgcolor: "white" }} variant="middle" />
              ) : (
                <></>
              )}

              {active ? (
                <Grid item xs="12" sx={{ mb: 3 }}>
                  <Grid
                    container
                    alignItems="center"          
                    justifyContent={"center"}
                    rowSpacing={1}
                  >
                    <Grid item xs="12" md="6">
                      <Grid
                        container
                        rowSpacing={1}
                        direction="column"
                        sx={{ m: 1 }}
                      >
                        <Grid item>
                          <TypographyPer variant="h5">
                            Tickets left: {TicktetsLeft}
                          </TypographyPer>
                        </Grid>
                        <Grid item>
                          <TypographyPer variant="h5">
                            Tickets already bought: {TotalTicketsUser}/
                            {MaxTicketsPlayers}
                          </TypographyPer>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs="12" md="6">
                      <Grid
                        container
                        alignItems="center"
                        justifyContent={"left"}
                        rowSpacing={1}
                        sx={{ m: 1 }}
                      >
                        <Grid item xs={12} md={6}>
                          <ButtonGroup
                            variant="outlined"
                            aria-label="outlined button group"
                          >
                            <Button
                              sx={{ color: "white" }}
                              onClick={() => {
                                ChangeNtickets(true);
                              }}
                            >
                              <Add />
                            </Button>
                            <Button sx={{ color: "white" }}>{NTickets}</Button>
                            <Button
                              sx={{ color: "white" }}
                              onClick={() => {
                                ChangeNtickets(false);
                              }}
                            >
                              <Remove />
                            </Button>
                          </ButtonGroup>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Box sx={{}}>
                            <BotonPersonalizado
                              onClick={join}
                              sx={{ border: 3 }}
                            >
                              <TypographyPer variant="h6">
                                {" "}
                                Buy Tickets
                              </TypographyPer>
                            </BotonPersonalizado>
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              ) : (
                <Grid item>
                  <BotonPersonalizado disabled sx={{ border: 3, marginTop: 2 }}>
                    <TypographyPer variant="h6"> Lottery ended</TypographyPer>
                  </BotonPersonalizado>
                </Grid>
              )}
            </Grid>
          </Card>
        )}
      </ThemeProvider>
    );
  }

  const prueba = () => {
    console.log(TicktetsLeft.toString());
    console.log(Nwinners.toString());
    console.log(CostTicket.toString());
    console.log(Prize.toString());
    console.log(MaxTickets.toString());
    console.log(MaxTicketsPlayers.toString());
    console.log(active.toString());
  };

  const ChangeNtickets = (boolean) => {
    if (
      boolean &&
      NTickets + 1 <= MaxTicketsPlayers - TotalTicketsUser &&
      TicktetsLeft > 0
    ) {
      setNTickets(NTickets + 1);
    } else if (!boolean && NTickets > 0) {
      setNTickets(NTickets - 1);
    } else if (boolean && NTickets + 1 > MaxTicketsPlayers - TotalTicketsUser) {
      setError("You can't buy more");
      setOpen(true);
    } else if (boolean && TicktetsLeft == 0) {
      setError("No more tickets available");
      setOpen(true);
    }
  };

  async function join() {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0x98A66BC886cA0B85E8188E2b6191E04DCb7aa31e",
      abi,
      signer
    );
    if (NTickets <= 0 && MaxTicketsPlayers - TotalTicketsUser > 0) {
      setError("Select number of tickets");
      setOpen(true);
    } else if (NTickets <= 0 && MaxTicketsPlayers - TotalTicketsUser == 0) {
      setError(
        "You already reached the maximum number of tickets on this wallet"
      );
      setOpen(true);
    } else if (NTickets > 0) {
      try {
        await contract.join(NTickets, {
          value: ethers.utils.parseEther((0.01 * NTickets).toString()),
        });
        setSuccess(true);
        setNTickets(0);
      } catch (e) {
        setError(e.reason.substring(e.reason.indexOf(": ") + 1));
        setOpen(true);
        console.log(e.reason);
        return e.reason;
      }
    }
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccess(false);
  };

  return (
    <Box
      style={{ background: "linear-gradient(to right top,#37005b, #20005e)" }}
    >
      {open ? (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="warning"
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        </Snackbar>
      ) : (
        <></>
      )}
      {Success ? (
        <Snackbar
          open={Success}
          autoHideDuration={6000}
          onClose={handleCloseSuccess}
        >
          <Alert
            onClose={handleCloseSuccess}
            severity="success"
            sx={{ width: "100%" }}
          >
            Success!!
          </Alert>
        </Snackbar>
      ) : (
        <></>
      )}
      <Box sx={{ pb: 10, pt: 3 }}>
        <TypographyPer variant="h1">Lottery</TypographyPer>
        <BotonPersonalizado
          sx={{ marginLeft: 4, border: 3 }}
          onClick={getInfoContract}
          disabled={buttonState === "loading"}
        >
          <Refresh />
          {buttonState === "loaded" ? "Refresh" : "Fetching..."}
        </BotonPersonalizado>
        {buttonState === "loaded" ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {showLottery()}
          </Box>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
}
