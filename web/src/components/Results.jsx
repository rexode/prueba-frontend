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
} from "@mui/material";
import { Box } from "@mui/system";

export default function (props) {
  const { account, provider } = props;
  const [lastGameId, setLastGameId] = useState(parseInt(0));
  const [active, setActive] = useState(false);
  const [buttonState, setButtonState] = useState("loaded");

  let Winners = Array.from(Array(1000), () => new Array());
  let Nwinners = [];
  let Pool = [];

  const getInfoContract = async () => {
    setButtonState("loading");
    const contract = new ethers.Contract(
      "0x925463A53124b23B5162ad1C3dCffcBcd6BEE040",
      abi,
      provider
    );

    const temActive = await contract.active();
    console.log(temActive.toString());
    setActive(temActive);

    const temIdGame = await contract.idGame();
    console.log(temIdGame.toString());

    let temlastGameId = temActive ? temIdGame : temIdGame;
    console.log(temlastGameId.toString());
    setLastGameId(temlastGameId);

    if (temlastGameId >= 1) {
      for (var i = temlastGameId; i > temlastGameId - 3 && i > 0; i--) {
        const temNwinners = await contract.Nwinners(i);
        console.log(temNwinners.toString());
        Nwinners.push(temNwinners);

        const temPool = await contract.pool(i);
        console.log(temPool.toString());
        Pool.push(temPool);

        Nwinners[i] = temNwinners;
        for (var j = 0; j < temNwinners; j++) {
          const temWinners = await contract.winners(i, j);
          console.log(temWinners);
          Winners[i][j]=temWinners;
        }
      }
    }
      setButtonState("loaded");
  };
  function ShowResults() {
    return (
      <Box>
        <Card raised sx={{ width: 1 / 2 }}>
          {Nwinners.map((winner) => (
            <Typography>{winner}</Typography>
          ))}
        </Card>
      </Box>
    );
  }

  return (
    <Box>
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
