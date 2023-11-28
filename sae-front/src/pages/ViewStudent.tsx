import React, { useState } from "react";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from "@mui/material";

function ViewStudent() {
  const names = ["Kanye West", "Kanye North", "Kanye South", "Kanye Est"];
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [invitedUserName, setInvitedUserName] = useState('');
  const [infoBoxOpen, setInfoBoxOpen] = useState(false);

  const handleViewButtonClick = (name: string) => {
    setInvitedUserName(name);
    setInfoBoxOpen(true);
    // Logique pour gérer le clic sur le bouton "Voir fiche utilisateur"
    console.log(`Voir fiche utilisateur de ${name}`);
  };

  const handleInviteButtonClick = (name: string) => {
    setInvitedUserName(name);
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
      {names.map((name, index) => (
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
            {name}
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleViewButtonClick(name)}
              style={{ marginRight: "10px" }}
            >
              Voir fiche utilisateur
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleInviteButtonClick(name)}
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
