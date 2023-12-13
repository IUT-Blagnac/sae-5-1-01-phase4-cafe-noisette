import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Project } from "../../models/Project";
import { getProjects, postTeam } from "../../rest/queries";
import toast from "react-hot-toast";
import { Team } from "../../models/Team";
import { useAuthUser } from "../../contexts/AuthUserContext";

const CreateTeam = () => {
  const authUser = useAuthUser();
  const [nameTeam, setNameTeam] = useState("");

  const handleConfirmClick = () => {

    const newTeam = { name: nameTeam, github: '', projectId: 0, membersId: [authUser.user?.id], leaderId: authUser.user?.id, preferencesId: []} as Team;

    postTeam(newTeam).then((response) => {

      console.log("Post Team Response:", response);
      if (response.responseCode === 200) {
        if (response.data) {
          if (authUser.user) {
            authUser.user.teamId = response.data.id as number
          }
          setNameTeam("")
          toast.success("L'équipe a été créée")
        }
      } else {
        console.log("Error while creating team: " + response.errorMessage)
        toast.error("Une erreur est survenue lors de la création de l'équipe (erreur " + response.responseCode + ")")
      }
    }).catch((error) => {
      toast("Une erreur est survenue lors de la création de l'équipe")
    })

  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        textAlign: "center",
        padding: "0 16px",
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: "2rem", sm: "3rem", md: "4rem" } }}>
        Création de l'équipe
      </Typography>

      <FormControl variant="outlined" sx={{ marginTop: "5%", marginBottom: "3%", width: "40%" }}>
        <TextField
          value={nameTeam}
          onChange={(e) => setNameTeam(e.target.value)}
          label="Nom de l'équipe"
          variant="outlined"
          fullWidth
        />
      </FormControl>

      <Button variant="contained" color="primary" onClick={handleConfirmClick}>
        Confirmer
      </Button>

    </Box>
  );
};

export default CreateTeam;