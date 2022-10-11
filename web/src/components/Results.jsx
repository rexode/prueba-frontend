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
  color: "white",
});
const BotonPersonalizado = styled(Button)({
  color: "white",
  background: "rgba(0,0,0,0.0)",
  borderRadius: 50,
  marginLeft: 4,
  border: 3,
});
export default function Results(props) {
  const { account, provider } = props;
  const [lastGameId, setLastGameId] = useState(parseInt(0));
  const [active, setActive] = useState(false);
  const [buttonState, setButtonState] = useState("loaded");
  const [Nwinners, setNwinners] = useState([]);
  const [Winners, setWinners] = useState([[], [], []]);
  const [ifWinners, setIfWinners] = useState([[], [], []]);
  const [signer, setSigner] = useState(null);
  const [Pool, setPool] = useState([]);
  const Aeth = 10 ** 18;
  const [error, setError] = useState("succesfull");
  const [open, setOpen] = useState(false);
  const [Success, setSuccess] = useState(false);

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
          winners.push(temWinners);
          const temIfWinners = (await contract.WithdrawWinners(i, j)) == true;
          console.log(i + "serie" + " " + j + "ha withdraw: " + temIfWinners);
          ifWinners.push(temIfWinners);
        }
        winner.push(winners);
      }
      setPool(pool);
      setNwinners(nwinners);
      setWinners(winner);
    }
    setButtonState("loaded");
    }
  };
  async function Withdraw(id) {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0x98A66BC886cA0B85E8188E2b6191E04DCb7aa31e",
      abi,
      signer
    );

    try {
      await contract.withdrawByWinner(id);
      setSuccess(true);
    } catch (e) {
      setError(e.reason.substring(e.reason.indexOf(": ") + 1));
      setOpen(true);
      console.log(e.reason);
      return e.reason;
    }
  }
  function ShowResults() {
    return (
      <>
        {parseInt(lastGameId) == 0 ? (
          <Card
            raised
            sx={{
              width: "50%",
              minHeight: 400,
              minWidth: 300,
              display: "flex",
              background: "rgba(0,0,0,0.0)",
              border: 4,
              color: "white",
              marginTop: 3,
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
                <Card
                  raised
                  sx={{
                    minHeight: 300,
                    minWidth: 300,
                    p: 1,
                    background: "rgba(0,0,0,0.0)",
                    border: 4,
                    color: "white",
                    marginTop: 3,
                  }}
                  elevation={0}
                >
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
                        <TypographyPer>
                          {Winners[lastGameId].indexOf(winner) + 1}º Position:
                          ...{winner.substring(winner.length - 7)}
                        </TypographyPer>
                        {winner.toUpperCase() == account.toUpperCase() ? (
                          <>
                            {Winners[lastGameId][
                              Winners[lastGameId].indexOf(winner)
                            ] != true ? (
                              <BotonPersonalizado
                                onClick={() => Withdraw(lastGameId)}
                                sx={{ marginTop: 2, border: 3 }}
                              >
                                <TypographyPer>Congrats you Won</TypographyPer>
                              </BotonPersonalizado>
                            ) : (
                              <BotonPersonalizado
                                disabled
                                sx={{ marginTop: 4, border: 3 }}
                              >
                                <TypographyPer>
                                  You already withdraw the prize
                                </TypographyPer>
                              </BotonPersonalizado>
                            )}
                          </>
                        ) : (
                          <></>
                        )}
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
                      <Card
                        raised
                        sx={{
                          p: 1,
                          minHeight: 200,
                          minWidth: 300,
                          background: "rgba(0,0,0,0.0)",
                          border: 4,
                          color: "white",
                          marginTop: 3,
                        }}
                        elevation={0}
                      >
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
                              <TypographyPer>
                                {Winners[lastGameId - 1].indexOf(winner) + 1}º
                                Position: ...
                                {winner.substring(winner.length - 7)}
                              </TypographyPer>
                              {winner.toUpperCase() == account.toUpperCase() ? (
                                <>
                                  {Winners[lastGameId - 1][
                                    Winners[lastGameId - 1].indexOf(winner)
                                  ] != true ? (
                                    <BotonPersonalizado
                                      onClick={() => Withdraw(lastGameId - 1)}
                                      sx={{ marginLeft: 4, border: 3 }}
                                    >
                                      <TypographyPer>
                                        Congrats you Won
                                      </TypographyPer>
                                    </BotonPersonalizado>
                                  ) : (
                                    <BotonPersonalizado
                                      disabled
                                      sx={{ marginLeft: 4, border: 3 }}
                                    >
                                      <TypographyPer>
                                        You already withdraw the prize
                                      </TypographyPer>
                                    </BotonPersonalizado>
                                  )}
                                </>
                              ) : (
                                <></>
                              )}
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
                        <Card
                          raised
                          sx={{
                            p: 1,
                            minWidth: 300,
                            background: "rgba(0,0,0,0.0)",
                            border: 4,
                            color: "white",
                            marginTop: 3,
                            minHeight: 200,
                          }}
                          elevation={0}
                        >
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
                                <TypographyPer>
                                  {Winners[lastGameId - 2].indexOf(winner) + 1}º
                                  Position: ...
                                  {winner.substring(winner.length - 7)}
                                </TypographyPer>
                                {winner.toUpperCase() ==
                                account.toUpperCase() ? (
                                  <>
                                    {Winners[lastGameId - 2][
                                      Winners[lastGameId - 2].indexOf(winner)
                                    ] != true ? (
                                      <BotonPersonalizado
                                        onClick={() => Withdraw(lastGameId - 2)}
                                        sx={{ marginLeft: 4, border: 3 }}
                                      >
                                        <TypographyPer>
                                          Congrats you Won
                                        </TypographyPer>
                                      </BotonPersonalizado>
                                    ) : (
                                      <BotonPersonalizado
                                        disabled
                                        sx={{ marginLeft: 4, border: 3 }}
                                      >
                                        <TypographyPer>
                                          You already withdraw the prize
                                        </TypographyPer>
                                      </BotonPersonalizado>
                                    )}
                                  </>
                                ) : (
                                  <></>
                                )}
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
      sx={{
        background: "linear-gradient(to right bottom,#37005b, #20005e)",
        pb: 10,
        pt: 3,
      }}
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
      <TypographyPer variant="h1">Results</TypographyPer>
      <BotonPersonalizado
        sx={{ color: "white", marginLeft: 4, border: 3 }}
        onClick={getInfoContract}
        disabled={buttonState === "loading"}
      >
        <Refresh />
        {buttonState === "loaded" ? "Refresh" : "Fetching..."}
      </BotonPersonalizado>
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
