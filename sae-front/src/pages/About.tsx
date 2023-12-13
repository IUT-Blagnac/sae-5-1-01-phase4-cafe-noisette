import React from "react";
import {Box, Typography} from "@mui/material";

function About() {
  return (
    <Box sx={{m:2}}>
      <Typography variant={"h4"}>À propos</Typography>
        <Typography variant={"body1"}>Ce site est web à été réalisé dans le cadre d'un projet SAE de l'IUT de Blagnac</Typography>

    </Box>
  );
}

export default About;