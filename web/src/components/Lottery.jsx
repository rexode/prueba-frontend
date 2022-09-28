import React from "react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Button, Typography, Card, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { Refresh } from "@mui/icons-material";
import abi from "../abi/abi.json";
import { styled } from "@mui/material";

export default function Lottery(props) {
  const [Nwinners, setNwinners] = useState("Refresh");
  const [Prize, setPrize] = useState("Refresh");
  const [MaxTickets, setMaxTickets] = useState("Refresh");
  const [TicktetsLeft, setTicktetsLeft] = useState("Refresh");
  const [PrizePerWinner, setPrizePerWinner] = useState("Refresh");
  const [MaxTicketsPlayers, setMaxTicketsPlayers] = useState("Refresh");
  const [CostTicket, setCostTicket] = useState("Refresh");
  const [buttonState, setButtonState] = useState("loaded");
  const [active, setActive] = useState(false);
  const { account, provider } = props;

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
      "0x97a3e38711404202Fc432555aC8c33FFE78558d1",
      abi,
      provider
    );
    const temMaxTicketsPerPlayer = await contract.maxTicketsPlayer();
    console.log(temMaxTicketsPerPlayer.toString());
    setMaxTicketsPlayers(parseInt(temMaxTicketsPerPlayer));


    const temNwinners = await contract.Nwinners();
    console.log(temNwinners.toString());
    setNwinners(parseInt(temNwinners));

    const temCost = (await contract.costTicket()) / Aeth;
    console.log(temCost.toString());
    setCostTicket(temCost);

    const temPrize = (await contract.prize()) / Aeth;
    console.log(temPrize.toString());
    setPrize(temPrize);

    const temPrizePerWinner = (await contract.prizePerwinner()) / Aeth;
    console.log(temPrizePerWinner.toString());
    setPrizePerWinner(temPrizePerWinner.toString());

    const temMaxTickets = await contract.maxTickets();
    console.log(temMaxTickets.toString());
    setMaxTickets(parseInt(temMaxTickets));

    const temTotalTicket = await contract.totalTickets();
    console.log(parseInt(temMaxTickets)-parseInt(temTotalTicket));
    setTicktetsLeft(parseInt(temMaxTickets)-parseInt(temTotalTicket));


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
    console.log(PrizePerWinner.toString());
    console.log(MaxTickets.toString());
    console.log(MaxTicketsPlayers.toString());
    console.log(active.toString());

  };

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
                <Typography>Nº Winners:{Nwinners}</Typography>
                <Typography>Cost Ticket:{CostTicket}</Typography>
                <Typography>Prize:{PrizePerWinner}</Typography>
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
                      <BotonPersonalizado>Buy {MaxTicketsPlayers} Ticket</BotonPersonalizado>
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
