import React from "react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Button, Typography, Card, Grid, Alert,Snackbar } from "@mui/material";
import { Box } from "@mui/system";
import { Refresh } from "@mui/icons-material";
import abi from "../abi/abi.json";
import { styled } from "@mui/material";
import { useTry, useTryAsync } from "no-try";

export default function Lottery(props) {
  const [Nwinners, setNwinners] = useState("Refresh");
  const [Prize, setPrize] = useState("Refresh");
  const [MaxTickets, setMaxTickets] = useState("Refresh");
  const [TicktetsLeft, setTicktetsLeft] = useState("Refresh");
  const [MaxTicketsPlayers, setMaxTicketsPlayers] = useState("Refresh");
  const [CostTicket, setCostTicket] = useState("Refresh");
  const [IdGame, setIdGame] = useState("Refresh");
  const [buttonState, setButtonState] = useState("loaded");
  const [active, setActive] = useState(false);
  const { account, provider } = props;
  const [error, setError] = useState("succesfull");
  const [ifError, setIfError] = useState(false);
  const [open, setOpen] = React.useState(false);


  const Aeth = 10 ** 18;

  const BotonPersonalizado = styled(Button)({
    color: "#f5efff",
    background: "linear-gradient(to right bottom, #4e54c8, #8f94fb)",
    borderRadius: 50,
    border: 1,
  });

  const getInfoContract = async () => {
    setButtonState("loading");
    const contract = new ethers.Contract(
      "0x925463A53124b23B5162ad1C3dCffcBcd6BEE040",
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

    const temMaxTickets = await contract.maxTickets();
    console.log(temMaxTickets.toString());
    setMaxTickets(parseInt(temMaxTickets));

    const temTotalTicket = await contract.totalTickets();
    console.log(parseInt(temMaxTickets) - parseInt(temTotalTicket));
    setTicktetsLeft(parseInt(temMaxTickets) - parseInt(temTotalTicket));

    const temActive = await contract.active();
    console.log(temActive.toString());
    setActive(temActive);

    setButtonState("loaded");
  };

  const prueba = () => {
    console.log(TicktetsLeft.toString());
    console.log(Nwinners.toString());
    console.log(CostTicket.toString());
    console.log(Prize.toString());
    console.log(MaxTickets.toString());
    console.log(MaxTicketsPlayers.toString());
    console.log(active.toString());
  };

  async function pruebaError() {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0x925463A53124b23B5162ad1C3dCffcBcd6BEE040",
      abi,
      signer
    );
    try {
      await contract.createLottery(100, 1, 1, 10);
    } catch (e) {
      setError(e.reason);
      setIfError(true);
      setOpen(true);
      console.log(e.reason);
      return e.reason;
    }
  }

  return (
    <Box>
      {account == null ? (
        <Typography>Connect to the blockchain</Typography>
      ) : (
        <Box>
          <Button
            onClick={getInfoContract}
            disabled={buttonState === "loading"}
          >
            <Refresh />
            {buttonState === "loaded" ? "Refresh" : "Fetching..."}
          </Button>
          {buttonState === "loaded" ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Card raised sx={{ width: 1 / 2 }}>
                <Typography variant="h1">Prize:{Prize}</Typography>
                <Typography>id:{IdGame}</Typography>
                <Typography>Nº Winners:{Nwinners}</Typography>
                <Typography>Cost Ticket:{CostTicket}</Typography>
                <Typography>Max Tickets:{MaxTickets}</Typography>
                <Typography>Tickets left:{TicktetsLeft}</Typography>
                <Typography>Max Tickets/wallet:{MaxTicketsPlayers}</Typography>
                {active ? (
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    spacing={12}
                  >
                    <Grid item>
                      <BotonPersonalizado>Buy 1 Ticket</BotonPersonalizado>
                    </Grid>
                    <Grid item>
                      <BotonPersonalizado>Buy 2 Ticket</BotonPersonalizado>
                    </Grid>
                    <Grid item>
                      <BotonPersonalizado>
                        Buy {MaxTicketsPlayers} Ticket
                      </BotonPersonalizado>
                      <BotonPersonalizado onClick={pruebaError}>
                        prueba
                      </BotonPersonalizado>
                      {ifError ? (
                        <Snackbar
                          open={open}
                          autoHideDuration={6000}
                          onClose={setIfError(false)}
                        >
                          <Alert
                            onClose={setIfError(false)}
                            severity="success"
                            sx={{ width: "100%" }}
                          >
                            This is a success message!
                          </Alert>
                        </Snackbar>
                      ) : (
                        <Alert severity="success" color="info">
                          This is a success alert — check it out!
                        </Alert>
                      )}
                    </Grid>
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
              </Card>
            </Box>
          ) : (
            <></>
          )}
          <Box></Box>
        </Box>
      )}
    </Box>
  );
}
