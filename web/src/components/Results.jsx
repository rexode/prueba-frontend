import React from "react";
import { useEffect, useState } from "react";
import { Refresh, Add, Remove } from "@mui/icons-material";
import { styled } from "@mui/material";

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
const TypographyPer = styled(Typography)({
  color: "#4e54c8",
});
export default function Results(props) {
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
      "0x822d9E18C1E5e5A66A16102841DCAa0e138cb865",
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
          console.log(i + "serie" + " " + j + "º position: " + temWinners);
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
          <Card raised sx={{ width: "50%", minHeight: 400, display: "flex" }}>
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
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  background: "FEFFF0",
                }}
              >
                <Card raised sx={{ minHeight: 300, p: 2 }}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item>
                      <TypographyPer variant="h3">
                        {Pool[lastGameId]}
                      </TypographyPer>
                    </Grid>
                    {Winners[lastGameId].map((winner) => (
                      <Grid item>
                        <TypographyPer>{winner}</TypographyPer>
                      </Grid>
                    ))}
                  </Grid>
                </Card>
              </Box>
            </Grid>
            {parseInt(lastGameId - 1) >= 0 ? (
              <Grid item>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        background: "FEFFF0",
                      }}
                    >
                      <Card raised sx={{ p: 2 ,minHeight: 200}}>
                        <Grid
                          container
                          direction="column"
                          justifyContent="center"
                          alignItems="center"
                          spacing={2}
                        >
                          <Grid item>
                            <TypographyPer variant="h3">
                              {Pool[lastGameId - 1]}
                            </TypographyPer>
                          </Grid>
                          {Winners[lastGameId - 1].map((winner) => (
                            <Grid item>
                              <TypographyPer>{winner}</TypographyPer>
                            </Grid>
                          ))}
                        </Grid>
                      </Card>
                    </Box>
                  </Grid>
                  {parseInt(lastGameId - 2) >= 0 ? (
                    <Grid item>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          background: "FEFFF0",
                        }}
                      >
                        <Card raised sx={{ p: 2 }}>
                          <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                          >
                            <Grid item>
                              <TypographyPer variant="h3">
                                {Pool[lastGameId - 2]}
                              </TypographyPer>
                            </Grid>
                            {Winners[lastGameId - 2].map((winner) => (
                              <Grid item>
                                <TypographyPer>{winner}</TypographyPer>
                              </Grid>
                            ))}
                          </Grid>
                        </Card>
                      </Box>
                    </Grid>
                  ) : (
                    <></>
                  )}
                </Grid>
              </Grid>
            ) : (
              <></>
            )}
          </Grid>
        )}
      </>
    );
  }

  return (
    <Box sx={{ background: "#FEFFF0", pb: 10, pt: 3 }}>
      <Typography variant="h1" sx={{ color: "#4e54c8" }}>
        Results
      </Typography>
      <Button
        sx={{ color: "#4e54c8" }}
        onClick={getInfoContract}
        disabled={buttonState === "loading"}
      >
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
