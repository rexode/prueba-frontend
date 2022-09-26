import React from "react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Refresh } from "@mui/icons-material";
import abi from "../abi/abi.json";
export default function Lottery() {
  const [account, setAccount] = useState("Refresh");
  const [provider, setProvider] = useState("Refresh");
  const [Nwinners, setNwinners] = useState("Refresh");
  const [Prize, setPrize] = useState("Refresh");
  const [MaxTickets, setMaxTickets] = useState("Refresh");
  const [TotalTickets, setTotalTickets] = useState("Refresh");
  const [PrizePerWinner, setPrizePerWinner] = useState("Refresh");
  const [MaxTicketsPlayers, setMaxTicketsPlayers] = useState("Refresh");
  const [CostTicket, setCostTicket] = useState("Refresh");
  const [buttonState, setButtonState] = useState("loaded");

  const Aeth = 10 ** 18;

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
    
    const temTotalTicket = await contract.totalTickets();
    console.log(temTotalTicket.toString());
    setTotalTickets(parseInt(temTotalTicket));

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

    
    setButtonState("loaded");
  };

  const prueba = () => {
    console.log(TotalTickets.toString());
    console.log(Nwinners.toString());
    console.log(CostTicket.toString());
    console.log(Prize.toString());
    console.log(PrizePerWinner.toString());
    console.log(MaxTickets.toString());
    console.log(MaxTicketsPlayers.toString());
  };
  const initConnection = async () => {
    if (typeof window.ethereum !== "undefined") {
      console.log("good");
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(tempProvider);
      console.log(provider);
      setAccount(accounts[0]);
    } else {
      console.log("install metamask");
    }
  };

  useEffect(() => {
    initConnection();
  }, []);

  return (
    <Box>
      {account == null ? (
        <Button onClick={initConnection}>Conectar</Button>
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
            
            <Box>
                <>{prueba()}</>
                
              <Typography>{account}</Typography>
              <Typography>{Nwinners}</Typography>
              <Typography>{CostTicket}</Typography>
              <Typography>{Prize}</Typography>
              <Typography>{PrizePerWinner}</Typography>
              <Typography>{MaxTickets}</Typography>
              <Typography>{TotalTickets}</Typography>
              <Typography>{MaxTicketsPlayers}</Typography>
            </Box>
          ) : ( <></>
          )}
          <Box></Box>
        </Box>
      )}
    </Box>
  );
}
