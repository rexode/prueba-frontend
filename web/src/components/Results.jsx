import React from "react";
import { useEffect, useState } from "react";
import { Refresh, Add, Remove } from "@mui/icons-material";

import { ethers } from "ethers";
import abi from "../abi/abi.json";
import {
  Button,
  Typography,
  Card,
  Grid,
  Alert,
  Snackbar,
  ButtonGroup,
  CardContent,
  CardActions,
  IconButton,
} from "@mui/material";
import { Box } from "@mui/system";

export default function (props) {
  const { account, provider } = props;
  const [lastGameId, setLastGameId] = useState(parseInt(0));
  const [active, setActive] = useState(false);
  const [buttonState, setButtonState] = useState("loaded");
  const [Nwinners, setNwinners] = useState([]);
  const [Winners, setWinners] = useState([[], [], []]);
  const [Pool, setPool] = useState([]);
  const Aeth = 10 ** 18;

  const getInfoContract = async () => {
    setButtonState("loading");
    const contract = new ethers.Contract(
      "0xf806F91F9E23E9639F83Ce7818720fCb4B79bbb9",
      abi,
      provider
    );
    var pool = [0];
    var nwinners = [0];
    var winner = [[]];

    const temActive = await contract.active();
    console.log(temActive.toString());
    setActive(temActive);

    const temIdGame = await contract.idGame();
    console.log(temIdGame.toString());

    let temlastGameId = temActive ? temIdGame - 1 : temIdGame;
    console.log(temlastGameId.toString());
    setLastGameId(temlastGameId);

    if (temlastGameId >= 1) {
      for (var i = temlastGameId; i > temlastGameId - 3 && i > 0; i--) {
        var winners = [];
        const temNwinners = await contract.Nwinners(i);
        console.log(temNwinners.toString());
        nwinners.push(temNwinners);

        const temPool = (await contract.pool(i)) / Aeth;
        console.log(temPool.toString());
        pool.push("Prize:" + (temPool * 0.8).toFixed(2));
        console.log(pool);

        for (var j = 0; j < temNwinners; j++) {
          const temWinners = await contract.winners(i, j);
          console.log(temWinners);
          winners.push(j + "º position: " + temWinners);
        }
        winner.push(winners);
      }
      setPool(pool);
      setNwinners(nwinners);
      setWinners(winner);
    }
    setButtonState("loaded");
  };
  function ShowResults() {
    console.log(parseInt(lastGameId));
    return (
      <>
        {parseInt(lastGameId) == 0 ? (
          <Box
            sx={{
              justifyContent: "center",
              minWidth: "50%",
              minHeight: 300,
            }}
          >
            <Card
              raised
              style={{
                minHeight: "100%",
                justify: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <CardContent>
                <Typography variant="h2">Refresh</Typography>
              </CardContent>
              <CardActions disableSpacing>
                <Button aria-label="add to favorites">
                  <Refresh/>
                  Refresh
                </Button>
              </CardActions>
            </Card>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              background: "FEFFF0",
            }}
          >
            <Card raised>
              <Typography variant="h3">{Pool[lastGameId]}</Typography>
              {Winners[lastGameId].map((winner) => (
                <Typography>{winner}</Typography>
              ))}
            </Card>
          </Box>
        )}
      </>
    );
  }

  return (
    <Box sx={{ background: "#FEFFF0" ,p:3}}>
      <Typography variant="h1">Results</Typography>
      <Button onClick={getInfoContract} disabled={buttonState === "loading"}>
        <Refresh />
        {buttonState === "loaded" ? "Refresh" : "Fetching..."}
      </Button>
      {buttonState === "loaded" ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {ShowResults()}
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
}
