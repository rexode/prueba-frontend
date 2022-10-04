import React from "react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Card,
  Grid,
  Alert,
  Snackbar,
  ButtonGroup,
} from "@mui/material";
import { Box } from "@mui/system";
import { Refresh, Add, Remove } from "@mui/icons-material";
import abi from "../abi/abi.json";
import { styled } from "@mui/material";

export default function Lottery(props) {
  const [Nwinners, setNwinners] = useState("Refresh");
  const [Prize, setPrize] = useState("Refresh");
  const [MaxTickets, setMaxTickets] = useState("Refresh");
  const [TicktetsLeft, setTicktetsLeft] = useState("Refresh");
  const [MaxTicketsPlayers, setMaxTicketsPlayers] = useState("Refresh");
  const [CostTicket, setCostTicket] = useState("Refresh");
  const [IdGame, setIdGame] = useState("Refresh");
  const [Pool, setPool] = useState("Refresh");

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
    [0.5, 0.1, 0.1, 0.5, 0.5],
  ];

  const Aeth = 10 ** 18;

  const BotonPersonalizado = styled(Button)({
    color: "#f5efff",
    background: "linear-gradient(to right bottom, #4e54c8, #8f94fb)",
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
        "0xf806F91F9E23E9639F83Ce7818720fCb4B79bbb9",
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
          (Pool * PercentageWinners[Nwinners][i]).toFixed(2).toString()
      );
    }

    return (
      <Card raised sx={{ width: "50%", minHeight: 400 }} >
        <Grid container alignItems="center" rowSpacing={1} sx={{mb:2}}>
          <Grid item xs={12}>
            <Typography variant="h1">Prize:{Prize}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>id:{IdGame}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>Nº Winners:{Nwinners}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>Cost Ticket:{CostTicket}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>Max Tickets:{MaxTickets}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>Tickets left:{TicktetsLeft}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>Max Tickets/wallet:{MaxTicketsPlayers}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              TicketsAlreadyBought :{TotalTicketsUser}/{MaxTicketsPlayers}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              direction="column"
              alignItems="center"
              rowSpacing={2}
            >
              {PrizeWinners.map((winner) => (
                <Grid item xs={2}>
                  <Typography>{winner}</Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {active ? (
              <Grid container direction="column" alignItems="center" >
                <ButtonGroup
                  variant="outlined"
                  aria-label="outlined button group"
                >
                  <Button
                    onClick={() => {
                      ChangeNtickets(true);
                    }}
                  >
                    <Add />
                  </Button>
                  <Button>{NTickets}</Button>
                  <Button
                    onClick={() => {
                      ChangeNtickets(false);
                    }}
                  >
                    <Remove />
                  </Button>
                </ButtonGroup>
                <Box sx={{ mt: 3 }}>
                  <BotonPersonalizado onClick={pruebaError}>
                    prueba
                  </BotonPersonalizado>
                </Box>
              </Grid>
            ) : (
              <Grid
                container
                direction="row"
                justifyContent="center"
                spacing={12}
              >
                <Grid item>
                  <BotonPersonalizado disabled>
                    Lottery ended
                  </BotonPersonalizado>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Card>
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
    if (boolean && NTickets + 1 <= MaxTicketsPlayers - TotalTicketsUser) {
      setNTickets(NTickets + 1);
    } else if (!boolean && NTickets > 0) {
      setNTickets(NTickets - 1);
    } else if (boolean && NTickets + 1 > MaxTicketsPlayers - TotalTicketsUser) {
      setError("You can't buy more");
      setOpen(true);
    }
  };

  async function pruebaError() {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0xf806F91F9E23E9639F83Ce7818720fCb4B79bbb9",
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
    <Box style={{ backgroundColor: "#f5efff" }}>
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
      <Box sx={{ p: 3 }}>
        <Typography variant="h1">Lottery</Typography>
        <Button onClick={getInfoContract} disabled={buttonState === "loading"}>
          <Refresh />
          {buttonState === "loaded" ? "Refresh" : "Fetching..."}
        </Button>
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
