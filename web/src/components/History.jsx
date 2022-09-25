import { Box } from "@mui/system";
import React from "react";
import {Celebration} from "@mui/icons-material";
import { Typography,Card } from "@mui/material";
import logo from "../assets/logo.png"
export default function History() {
    return(
        <Box sx={{flexDirection: 'row',justifyContent: 'space-around',display:"flex"}}>
            <Card sx={{borderRadious:1, p:2,minWidth:200,backgroundColor:"black"}} elevation={0}>
                <img src={logo} alt="Logo" />
            </Card>
            <Box>
                <Typography variant="h2">
                    Who are we?
                </Typography>
            </Box>
        </Box>

    )

}