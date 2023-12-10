import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Project } from "../models/Project";
import { getProjects } from "../rest/queries";

const CreateTeam = () => {
  const [choice1, setChoice1] = useState("");
  const [choice2, setChoice2] = useState("");
  const [choice3, setChoice3] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [teamInfo, setTeamInfo] = useState({
    teamName: "",
    numberOfMembers: "",
    contact: "",
    leader: "",
  });
  const [showTeamInfoDialog, setShowTeamInfoDialog] = useState(false);
  const [projects, setProjects] = useState([] as Project[]);

  const handleConfirmClick = () => {
    console.log("Liste des sujets:", choice2);
    setConfirmationMessage("La demande est envoyée");
  };

  const handleTeamInfoClick = () => {
    setShowTeamInfoDialog(true);
  };

  const handleTeamInfoChange = (field: string, value: string) => {
    setTeamInfo((prevTeamInfo) => ({
      ...prevTeamInfo,
      [field]: value,
    }));
  };

  const handleTeamInfoDialogClose = () => {
    setShowTeamInfoDialog(false);
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
        <InputLabel>Nom de l'équipe</InputLabel>
        <TextField
          value={choice1}
          onChange={(e) => setChoice1(e.target.value)}
          label="Nom de l'équipe"
          variant="outlined"
          fullWidth
        />
      </FormControl>

      <FormControl variant="outlined" sx={{ marginBottom: "7%", width: "40%" }}>
        <InputLabel>Liste des sujets</InputLabel>
        <Select
          value={choice2}
          onChange={(e) => setChoice2(e.target.value)}
          label="Liste des sujets resntants"
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

      {confirmationMessage && (
        <Typography variant="body1" color="green" sx={{ marginTop: 2 }}>
          {confirmationMessage}
        </Typography>
      )}



    </Box>
  );
};

export default CreateTeam;
