import React, { useState, useEffect } from "react";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AlertColor, Box, Typography } from "@mui/material";
import { addMemberTeam, getStudents, getStudentsByUsername, getTeamsWithTeamId, getUserByUsername } from "../rest/queries";
import { User } from "../models/User";
import { PlayerInfo } from "../models/PlayerInfo";
import UserInfos, { skillType } from "./UserInfos";
import UserInfosView from "./UserInfosView";
import { useAuthUser } from "../contexts/AuthUserContext";
import { Team } from "../models/Team";
import { CustomAlert } from "../components/CustomAlert";

function ViewStudent() {
  const authUser = useAuthUser();
  const [students, setStudents] = React.useState([] as User[])
  const [skills, setSkills] = React.useState([] as skillType[])
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = React.useState({} as User);
  const [infoBoxOpen, setInfoBoxOpen] = useState(false);
  const [team, setTeam] = React.useState({} as Team)
  const [textAlert, setTextAlert] = useState("");
  const [typeAlert, setTypeAlert] = React.useState("" as AlertColor)


  useEffect(() => {
    if (authUser.user !== undefined) {
      requestStudents();
    }
  }, [authUser.user]);

  function requestStudents() {
    getStudents().then((response) => {
      if (response.responseCode === 200) {
        if (response.data) {
          setStudents(response.data);
          if (authUser.user?.teamId !== null) {
            requestTeam(response.data.filter((student) => student.teamId === null));
          }
        }
      } else {
        console.log("Error while getting students: " + response.errorMessage);
      }
    }
    )
  }

  function requestTeam(studentsWithoutTeam: User[]) {
    const teamId = authUser.user?.teamId as number;
    getTeamsWithTeamId(teamId).then((response) => {
      if (response.responseCode === 200) {
        if (response.data) {
          setTeam(response.data[0]);
          if (response.data[0].leaderId === authUser.user?.id) {
            if (studentsWithoutTeam.length !== 0) {
              if (studentsWithoutTeam.length === 1) {
                setTypeAlert("info")
                setTextAlert("Il y a 1 étudiant sans équipe")
                setTimeout(() => {
                  setTextAlert("");
                }, 2000);
              } else {
                setTypeAlert("info")
                setTextAlert("Il y a " + studentsWithoutTeam.length + " étudiants sans équipe")
                setTimeout(() => {
                  setTextAlert("");
                }, 2000);
              }
            }
          }
        }
      } else {
        console.log("Error while getting team: " + response.errorMessage);
      }
    }
    )
  }

  const handleViewButtonClick = (student: User) => {
    setSelectedUser(student);
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
    setSelectedUser(student);
    setInviteDialogOpen(true);
  };

  const handleInviteDialogClose = () => {
    setInviteDialogOpen(false);
  };

  const handleInviteConfirmation = () => {
    //invite
    if (selectedUser.teamId === null) {

      selectedUser.teamId = authUser.user?.teamId as number;

      addMemberTeam(selectedUser, team.id as number).then((response) => {
        if (response.responseCode === 200) {
          if (response.data) {
            setTypeAlert("success")
            setTextAlert("L'étudiant a bien été invité !")
            setTimeout(() => {
              setTextAlert("");
            }, 2000);
          }
        } else {
          console.log("Une erreur est survenue lors de la mise à jour de l'étudiant (erreur " + response.responseCode + ")")
        }
      }
      ).catch((error) => {
        console.log("Une erreur est survenue lors de la mise à jour de l'étudiant")
      })
    } else {
      setTypeAlert("error")
      setTextAlert("L'étudiant est déjà dans une équipe.")
      setTimeout(() => {
        setTextAlert("");
      }, 2000);
    }

    setInviteDialogOpen(false);
  };

  const handleInfoBoxClose = () => {
    setInfoBoxOpen(false);
  };

  const compareStudents = (studentA: User, studentB: User) => {
    // Placer en premier les étudiants avec teamId === null
    if (studentA.teamId === null && studentB.teamId !== null) {
      return -1;
    } else if (studentA.teamId !== null && studentB.teamId === null) {
      return 1;
    } else {
      // Pour les autres cas, ne pas changer l'ordre
      return 0;
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Accueil</h1>
      {students.sort(compareStudents).map((student, index) => (
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
            {student.teamId === null && authUser.user?.id === team.leaderId && (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleInviteButtonClick(student)}
                style={{ marginRight: "10px" }}
              >
                Inviter utilisateur
              </Button>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleViewButtonClick(student)}
            >
              Voir fiche utilisateur
            </Button>

          </div>
        </Box>
      ))}

      <CustomAlert text={textAlert} typeAlert={typeAlert} />

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
            Vous visualisez la fiche de l'utilisateur : {selectedUser.playerInfo?.nickname}.
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
            Êtes-vous sûr de vouloir inviter {selectedUser.username} dans votre équipe ?
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
