import React from "react";
import { useEffect, useState } from "react";
import { Refresh, Add, Remove } from "@mui/icons-material";
import {BotonPersonalizado,themeDark,themeLight} from "./Themes"
import { styled,CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { ethers } from "ethers";
import abi from "../abi/abiLottery.json";
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
export default function Results(props) {
  const { account, provider,DarkMode } = props;
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
    setButtonState("loading");
    const tempSigner = provider.getSigner();
    setSigner(tempSigner);
    const contract = new ethers.Contract(
      "0x4e4f221A11708bB6b9DF9b08a8d5fb2FBeE5f844",
      abi,
      provider
    );
    var pool = [0];
    var nwinners = [0];
    var winner = [[]];
    var fwinner = [[]];


    const temActive = await contract.active();
    console.log(temActive.toString());
    setActive(temActive);

    const temIdGame = await contract.idGame();
    console.log(temIdGame.toString());

    let temlastGameId = temActive ? (temIdGame -1): temIdGame;
    console.log("LastGameID"+temlastGameId.toString());
    setLastGameId(temlastGameId.toString());

    if (temlastGameId >= 1) {
      for (var i = temlastGameId; i > temlastGameId - 3 && i > 0; i--) {
        var winners = [];
        var fwinners = [];
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
          fwinners.push(temIfWinners);
        }
        winner.push(winners);
        fwinner.push(fwinners);

      }
      setPool(pool);
      setNwinners(nwinners);
      setWinners(winner);
      setIfWinners(fwinner);
    }
    setButtonState("loaded");
    console.log("xDDDDDDDD");
  };
  async function Withdraw(id) {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0x4e4f221A11708bB6b9DF9b08a8d5fb2FBeE5f844",
      abi,
      signer
    );

    try {
      console.log("id:"+id);
      console.log("wallet:"+account);
      


      await contract.withdrawByWinner(parseInt(id));
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
              display: "flex",
              background: "rgba(0,0,0,0.0)",border: 4,
              color: "white",
              marginTop: 3
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
                <Typography color="primary" variant="h1" sx={{ flexGrow: 1 }}>
                  Refresh Data
                </Typography>
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
                  sx={{ minHeight: 300,minWidth:300, p: 2, background: "rgba(0,0,0,0.0)",border: 4,
                  color: "white",
                  marginTop: 3, }}
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
                      <Typography color="primary"variant="h3">
                        {Pool[1]}
                      </Typography>
                      <Typography color="primary" variant="h5">
                        Id:{lastGameId}
                      </Typography>
                    </Grid>
                    {Winners[1].map((winner) => (
                      <Grid item>
                        <Typography color="primary">
                          {Winners[1].indexOf(winner) + 1}º Position:
                          ...{winner.substring(winner.length - 7)}
                        </Typography>
                        {winner.toUpperCase() == account.toUpperCase() ? (
                          <>
                            {ifWinners[1][
                              Winners[1].indexOf(winner)
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
            {parseInt(lastGameId - 1) > 0 ? (
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
                          p: 2,
                          minHeight: 200,
                          background: "rgba(0,0,0,0.0)",minWidth:300,minHeight:300,
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
                            <Typography color="primary" variant="h3">
                              {Pool[2]}
                            </Typography>
                            <Typography color="primary" variant="h5">
                        Id:{lastGameId-1}
                      </Typography>
                          </Grid>
                          {Winners[2].map((winner) => (
                            <Grid item>
                              <Typography color="primary">
                                {Winners[2].indexOf(winner) + 1}º
                                Position: ...
                                {winner.substring(winner.length - 7)}
                              </Typography>
                              {winner.toUpperCase() == account.toUpperCase() ? (
                                <>
                                  {ifWinners[2][
                                    Winners[2].indexOf(winner)
                                  ] != true ? (
                                    <Button
                                      onClick={() => Withdraw(lastGameId - 1)}
                                      sx={{ marginLeft: 4, border: 3 }}
                                    >
                                      <TypographyPer>
                                        Congrats you Won
                                      </TypographyPer>
                                    </Button>
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
                  {parseInt(lastGameId - 2) > 0 ? (
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
                          sx={{ p: 2,minHeight:300, minWidth:300,background: "rgba(0,0,0,0.0)" ,border: 4,
                          color: "white",
                          marginTop: 3,}}
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
                              <Typography color="primary" variant="h3">
                                {Pool[3]}
                              </Typography>
                              <Typography color="primary" variant="h5">
                                Id: {(parseInt(lastGameId-2))}
                      </Typography>
                            </Grid>
                            {Winners[3].map((winner) => (
                              <Grid item>
                                <Typography color="primary">
                                  {Winners[3].indexOf(winner) + 1}º
                                  Position: ...
                                  {winner.substring(winner.length - 7)}
                                </Typography>
                                {winner.toUpperCase() ==
                                account.toUpperCase() ? (
                                  <>
                                    {ifWinners[3][
                                      Winners[3].indexOf(winner)
                                    ] != true ? (
                                      <BotonPersonalizado
                                        onClick={() => Withdraw(lastGameId-2)}
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
    <ThemeProvider theme={DarkMode? themeLight:themeDark}>
    <CssBaseline />  

    <Box
      sx={{
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
      <Typography color="primary"variant="h1">Results</Typography>
      <Button
        sx={{ color: "white", marginLeft: 4, border: 3 }}
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
    </ThemeProvider>
  );
}
