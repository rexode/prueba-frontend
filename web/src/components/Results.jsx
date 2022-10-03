import React from "react";
import { useEffect, useState } from "react";

import { ethers } from "ethers";
import abi from "../abi/abi.json";


export default function (props) {
  const { account, provider } = props;
  const [IdGame, setIdGame] = useState("Refresh");
  const [active, setActive] = useState(false);
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
      
      


  };
}
