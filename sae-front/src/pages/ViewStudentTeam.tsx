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

const ViewStudentTeam = () => {
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
    console.log("Choix 1:", choice1);
    console.log("Choix 2:", choice2);
    console.log("Choix 3:", choice3);
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
        Classification des préférences des sujets
      </Typography>

      <FormControl variant="outlined" sx={{ marginTop: "5%", marginBottom: "3%", width: "40%" }}>
        <InputLabel>Choix n°1</InputLabel>
        <Select
          value={choice1}
          onChange={(e) => setChoice1(e.target.value)}
          label="Choix n°1"
        >
          {projects.map((project) => (
            <MenuItem key={project.id} value={project.id}>
              {project.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl variant="outlined" sx={{ marginBottom: "3%", width: "40%" }}>
        <InputLabel>Choix n°2</InputLabel>
        <Select
          value={choice2}
          onChange={(e) => setChoice2(e.target.value)}
          label="Choix n°2"
        >
          {projects.map((project) => (
            <MenuItem key={project.id} value={project.id}>
              {project.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl variant="outlined" sx={{ marginBottom: "7%", width: "40%" }}>
        <InputLabel>Choix n°3</InputLabel>
        <Select
          value={choice3}
          onChange={(e) => setChoice3(e.target.value)}
          label="Choix n°3"
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

      <Button variant="outlined" color="primary" sx={{ marginTop: 2 }} onClick={handleTeamInfoClick}>
      Informations de l'équipe
      </Button>

      <Dialog open={showTeamInfoDialog} onClose={handleTeamInfoDialogClose}>
        <DialogTitle>Informations de l'équipe</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              border: "1px solid #000",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              label="Nom équipe"
              value={teamInfo.teamName}
              onChange={(e) => handleTeamInfoChange("teamName", e.target.value)}
              sx={{ marginBottom: "10px", width: "80%" }}
              disabled
            />
            <TextField
              label="Nombre de membres"
              value={teamInfo.numberOfMembers}
              onChange={(e) => handleTeamInfoChange("numberOfMembers", e.target.value)}
              sx={{ marginBottom: "10px", width: "80%" }}
              disabled
            />
            <TextField
              label="Contact"
              value={teamInfo.contact}
              onChange={(e) => handleTeamInfoChange("contact", e.target.value)}
              sx={{ marginBottom: "10px", width: "80%" }}
              disabled
            />
            <TextField
              label="Leader"
              value={teamInfo.leader}
              onChange={(e) => handleTeamInfoChange("leader", e.target.value)}
              sx={{ marginBottom: "10px", width: "80%" }}
              disabled
            />
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ViewStudentTeam;
