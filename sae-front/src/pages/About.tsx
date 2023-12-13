import React from "react";
import {Box, Typography} from "@mui/material";
import Link from "@mui/material/Link";

function About() {
  return (
    <Box sx={{m:2}}>
      <Typography variant={"h4"}>À propos</Typography>
        <Typography variant={"body1"}>Ce site est web à été réalisé dans le cadre d'un projet SAE de l'IUT de Blagnac</Typography>
        <Link href={"https://github.com/IUT-Blagnac/sae-5-1-01-phase4-cafe-noisette/tree/develop"} target={"_blank"}>Github du projet</Link>
    </Box>
  );
}

export default About;