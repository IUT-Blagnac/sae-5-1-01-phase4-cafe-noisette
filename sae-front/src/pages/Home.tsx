import {useAuthUser} from "../contexts/AuthUserContext";
import React from "react";
import {Box, Typography} from "@mui/material";

function Home() {
  const authUser = useAuthUser();

  return (
    <Box sx={{m:2}}>
      <Typography variant={'h4'}>Accueil</Typography>
      <Typography variant={'h6'}>Bienvenu·e {authUser.user?.firstname} {authUser.user?.lastname}</Typography>
    </Box>
  );
}

export default Home;