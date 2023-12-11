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
import { Project } from "../models/Project";
import { getProjects, postTeam } from "../rest/queries";
import toast from "react-hot-toast";
import { Team } from "../models/Team";
import { useAuthUser } from "../contexts/AuthUserContext";

const CreateTeam = () => {
  const authUser = useAuthUser();
  const [nameTeam, setNameTeam] = useState("");
  const [projectIdTeam, setProjectIdTeam] = useState(0);
  const [projects, setProjects] = useState([] as Project[]);

  const handleConfirmClick = () => {

    const newTeam = {name: nameTeam, github: '', projectId: projectIdTeam, membersId: [authUser.user?.id], leaderId: authUser.user?.id} as Team;
    
    postTeam(newTeam).then((response) => {

      console.log("Post Team Response:", response);
      if (response.responseCode === 200) {
          if (response.data) {
            setNameTeam("")
            setProjectIdTeam(0)
            toast.success("L'équipe a été créée")
          }
      } else {
          console.log("Error while creating team: " + response.errorMessage)
          toast.error("Une erreur est survenue lors de la création de l'équipe (erreur "+response.responseCode+")")
      }
    }).catch((error) => {
        toast("Une erreur est survenue lors de la création de l'équipe")
    })

  };

  useEffect(() => {
    requestProjects();
  }, []);

  function requestProjects() {
    getProjects().then((response) => {
      if (response.responseCode === 200) {
        if (response.data) {
          setProjects(response.data);
        }
      } else {
        console.log("Error while getting projects: " + response.errorMessage);
      }
    });
  }

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

      <FormControl variant="outlined" sx={{ marginBottom: "7%", width: "40%" }}>
        <InputLabel>Liste des sujets</InputLabel>
        <Select
          value={projectIdTeam}
          onChange={(e) => setProjectIdTeam(e.target.value as number)}
          label="Liste des sujets restants"
        >
          {projects.map((project) => (
            <MenuItem key={project.id} value={project.id}>
              {project.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button variant="contained" color="primary" onClick={handleConfirmClick}>
        Confirmer
      </Button>

    </Box>
  );
};

export default CreateTeam;
