import React, { useState, useEffect } from "react";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from "@mui/material";
import { getStudents, getStudentsByUsername, getUserByUsername } from "../rest/queries";
import { User } from "../models/User";
import { PlayerInfo } from "../models/PlayerInfo";
import UserInfos, { skillType } from "./UserInfos";
import UserInfosView from "./UserInfosView";

function ViewStudent() {
  const [students, setStudents] = React.useState([] as User[])
  const [skills, setSkills] = React.useState([] as skillType[])
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [invitedUserName, setInvitedUserName] = useState('');
  const [infoBoxOpen, setInfoBoxOpen] = useState(false);

  useEffect(() => {
    requestStudents();
  }, []);

  useEffect(() => {
    console.log(students);
  }, [students]);

  function requestStudents() {
    getStudents().then((response) => {
      if (response.responseCode === 200) {
        if (response.data) {
          setStudents(response.data);
        }
      } else {
        console.log("Error while getting students: " + response.errorMessage);
      }
    }
    )
  }

  const handleViewButtonClick = (student: User) => {
    setInvitedUserName(student.playerInfo!.nickname);
    setInfoBoxOpen(true);
    // Logique pour gérer le clic sur le bouton "Voir fiche utilisateur"
    console.log(`Voir fiche utilisateur de ${student.playerInfo!.nickname}`);
    getStudentsByUsername(student.username).then((response) => {
      if (response.responseCode === 200) {
        if (response.data) {

          setSkills([
            { name: 'globalLevel', label: 'Niveau global en projet de dev :', value: response.data[0].playerInfo!.globalLevel, color: 'secondary.main' },
            { name: 'chiefLevel', label: 'Niveau chef de projet :', value: response.data[0].playerInfo!.chiefLevel, color: 'primary.main' },
            { name: 'frontLevel', label: 'Niveau front :', value: response.data[0].playerInfo!.frontLevel, color: 'primary.main' },
            { name: 'backLevel', label: 'Niveau back :', value: response.data[0].playerInfo!.backLevel, color: 'primary.main' },
            { name: 'testLevel', label: 'Niveau test :', value: response.data[0].playerInfo!.testLevel, color: 'primary.main' },
            { name: 'docLevel', label: 'Niveau documentation :', value: response.data[0].playerInfo!.docLevel, color: 'primary.main' },
            { name: 'gitLevel', label: 'Niveau git :', value: response.data[0].playerInfo!.gitLevel, color: 'primary.main' },
            { name: 'designLevel', label: 'Niveau design :', value: response.data[0].playerInfo!.designLevel, color: 'primary.main' },
            { name: 'otherLevel', label: response.data[0].playerInfo!.otherDesc, value: response.data[0].playerInfo!.otherLevel, color: 'primary.main' },
          ])
        }
      } else {
        console.log("Error while getting students: " + response.errorMessage);
      }
    }
    )
  };

  const handleInviteButtonClick = (student: User) => {
    setInvitedUserName(student.playerInfo!.nickname);
    setInviteDialogOpen(true);
  };

  const handleInviteDialogClose = () => {
    setInviteDialogOpen(false);
  };

  const handleInviteConfirmation = () => {
    // Logique pour confirmer l'invitation
    console.log(`Inviter utilisateur ${invitedUserName}`);
    setInviteDialogOpen(false);
  };

  const handleInfoBoxClose = () => {
    setInfoBoxOpen(false);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Accueil</h1>
      {students.map((student, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "10px",
            marginBottom: 3,
            marginLeft: "10%",
            width: "80%",
            //margin: "auto"
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <AccountBoxIcon style={{ marginRight: "10px" }} />
            {student.playerInfo?.nickname}
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleViewButtonClick(student)}
              style={{ marginRight: "10px" }}
            >
              Voir fiche utilisateur
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleInviteButtonClick(student)}
            >
              Inviter utilisateur
            </Button>
          </div>
        </Box>
      ))}

      {/* Boîte d'information */}
      <Dialog
        open={infoBoxOpen}
        onClose={handleInfoBoxClose}
        aria-labelledby="info-box-title"
        aria-describedby="info-box-description"
      >
        <DialogTitle id="info-box-title">Information</DialogTitle>
        <DialogContent>
          <DialogContentText id="info-box-description">
            Vous visualisez la fiche de l'utilisateur : {invitedUserName}.
          </DialogContentText>
        </DialogContent>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{ m: 2 }}
        >
          <Box
            display="flex"
            flexDirection="column"
          >
            <UserInfosView skills={skills} />
          </Box>
        </Box>
        <DialogActions>
          <Button onClick={handleInfoBoxClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {/* Boîte de dialogue d'invitation */}
      <Dialog
        open={inviteDialogOpen}
        onClose={handleInviteDialogClose}
        aria-labelledby="invite-dialog-title"
        aria-describedby="invite-dialog-description"
      >
        <DialogTitle id="invite-dialog-title">Confirmation d'invitation</DialogTitle>
        <DialogContent>
          <DialogContentText id="invite-dialog-description">
            Êtes-vous sûr de vouloir inviter {invitedUserName} dans votre équipe ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleInviteDialogClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleInviteConfirmation} color="primary">
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ViewStudent;
