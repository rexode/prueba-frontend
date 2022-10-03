import React from "react";
import { useEffect, useState } from "react";

import { ethers } from "ethers";
import abi from "../abi/abi.json";

export default function (props) {
  const { account, provider } = props;
  const [IdGame, setIdGame] = useState("Refresh");
  const [active, setActive] = useState(false);
  let winners = [][20];
  let Nwinners = [];
  const getInfoContract = async () => {
    const contract = new ethers.Contract(
      "0x97a3e38711404202Fc432555aC8c33FFE78558d1",
      abi,
      provider
    );
    const temActive = await contract.active();
    console.log(temActive.toString());
    setActive(temActive);

    const temIdGame = await contract.idGame();
    console.log(temIdGame.toString());
    setIdGame(parseInt(temIdGame));

    let lastGameId = active ? temIdGame - 1 : temIdGame;
    if (lastGameId > 1) {
      for (var i = lastGameId; i > lastGameId-3 && i>0; i--) {
        var temNwinners = await contract.Nwinners(i);
        console.log(temIdGame.toString());
        Nwinners[i] = temNwinners;
        for (var j =0 ; i < temNwinners; i++) {
          var temWinners = await contract.winners(i,j);
          winners.push(temWinners);
        }
      }
    }
  };
  return(
    <></>
  )
}
