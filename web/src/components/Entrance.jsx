import { Paper, Typography,Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { styled } from "@mui/material";
import imageBackground from "../assets/imageBackground.jpg"
const BotonPersonalizado = styled(Button)({
    color: "#f5efff",
    background: "linear-gradient(to right bottom, #4e54c8, #8f94fb)",
    borderRadius: 50,
  });
const Entrance = ()=>{

return(
<Paper elevation={0} sx={{backgroundImage: `url(${imageBackground})`}} variant="outlined" square>
<Box>
<Typography variant="h1">Easy To</Typography>
<Typography variant="h1">Win</Typography>
<Typography variant="h3">3 Simple steps</Typography>
<Typography variant="h4">1º Connect your wallet</Typography>
<Typography variant="h4">2º Buy the Tickets  
<BotonPersonalizado sx={{marginLeft:4}}>To Lottery</BotonPersonalizado>
</Typography>
<Typography variant="h4">3º Wait for the results
<BotonPersonalizado sx={{marginLeft:4}}>To Results</BotonPersonalizado>
</Typography>

</Box>
</Paper>
)


}
export default Entrance;