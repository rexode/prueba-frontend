import React from "react";
import { ethers } from "ethers";
import abi from "../abi/abi.json";


export default function (props) {
  const { account, provider } = props;
  const getInfoContract = async () => {
    const contract = new ethers.Contract(
        "0x97a3e38711404202Fc432555aC8c33FFE78558d1",
        abi,
        provider
      );


  };
}
