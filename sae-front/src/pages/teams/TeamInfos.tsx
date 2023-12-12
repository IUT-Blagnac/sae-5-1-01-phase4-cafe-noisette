import React, { useState, useEffect } from "react";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Typography } from "@mui/material";
import { getStudents, getStudentsByUsername, getTeamsWithTeamId, putStudent } from "../../rest/queries";
import { User } from "../../models/User";
import { PlayerInfo } from "../../models/PlayerInfo";
import UserInfos, { skillType } from "../UserInfos";
import UserInfosView from "../UserInfosView";
import { useAuthUser } from "../../contexts/AuthUserContext";
import { Team } from "../../models/Team";
import toast from "react-hot-toast";

function TeamInfos() {
    const [students, setStudents] = React.useState([] as User[])
    const [team, setTeam] = React.useState({ name: '', github: '', projectId: 0, membersId: [], leaderId: 0 } as Team)
    const [skills, setSkills] = React.useState([] as skillType[])
    const [selectedUser, setSelectedUser] = React.useState({} as User);
    const [infoBoxOpen, setInfoBoxOpen] = useState(false);
    const [inviteMembersBoxOpen, setInviteMembersBoxOpen] = useState(false);
    const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
    const authUser = useAuthUser();

    useEffect(() => {
        if (authUser.user !== undefined) {
            requestStudents();
            requestTeam();
        }
    }, [authUser.user]);

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

    function requestTeam() {
        const teamId = authUser.user?.teamId as number;
        getTeamsWithTeamId(teamId).then((response) => {
            if (response.responseCode === 200) {
                if (response.data) {
                    setTeam(response.data[0])
                }
            } else {
                console.log("Error while getting students: " + response.errorMessage);
            }
        }
        )
    }

    const handleInviteMembersButtonClick = () => {
        if (students.filter((student) => student.teamId === null).length !== 0) {
            setInviteMembersBoxOpen(true);
        } else {
            toast.error("Aucun étudiant à inviter")
        }
    }

    const handleInviteButtonClick = (student: User) => {
        setSelectedUser(student);
        setInviteDialogOpen(true);
    };

    const handleInviteConfirmation = () => {
        //invite
        if (selectedUser.teamId === null) {
            const updatedUser = Object.assign({}, selectedUser);
            updatedUser.teamId = authUser.user?.teamId as number;
            putStudent(updatedUser).then((response) => {
                if (response.responseCode === 200) {
                    if (response.data) {
                        toast.success("L'étudiant a bien été invité !")
                    }
                } else {
                    toast.error("Une erreur est survenue lors de la mise à jour de l'étudiant (erreur " + response.responseCode + ")")
                }
            }
            ).catch((error) => {
                toast.error("Une erreur est survenue lors de la mise à jour de l'étudiant")
            })
        } else {
            toast.error("L'étudiant est déjà dans une équipe.")
        }

        setInviteDialogOpen(false);

        if (students.filter((student) => student.teamId === null).length === 0) {
            setInviteMembersBoxOpen(false);
        }


    };


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

    const handleInfoBoxClose = () => {
        setInfoBoxOpen(false);
    };

    const handleInviteMembersBoxClose = () => {
        setInviteMembersBoxOpen(false);
    };

    const handleInviteDialogClose = () => {
        setInviteDialogOpen(false);
    };

    return (
        <div style={{ textAlign: "center" }}>
            <h1>Mon équipe</h1>
            <h2>{team.name}</h2>
            {students.filter((student) => student.teamId === authUser.user?.teamId).map((student, index) => (
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

                    <Typography
                        style={{
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                        }}
                    >
                        {student.firstname} {student.lastname}
                    </Typography>
                    <div style={{ display: 'flex', alignItems: 'center' }}>

                        {student.id === team.leaderId && (
                            <Typography
                                variant="h6"
                                color="secondary"
                                style={{
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    marginRight: '50px'
                                }}
                            >
                                Leader
                            </Typography>
                        )}

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleViewButtonClick(student)}
                            style={{ marginRight: "10px" }}
                        >
                            Voir fiche utilisateur
                        </Button>
                    </div>
                </Box>

            ))}
            <Button
                variant="contained"
                color="secondary"
                onClick={() => handleInviteMembersButtonClick()}
                style={{ marginRight: "10px" }}
            >
                Inviter des membres
            </Button>

            {/* Boîtes d'informations */}
            <Dialog
                open={inviteMembersBoxOpen}
                onClose={handleInviteMembersBoxClose}
                aria-labelledby="info-box-title"
                aria-describedby="info-box-description"
            >
                <DialogContent>
                    {students.filter((student) => student.teamId === null).map((student, index) => (
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
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", paddingRight: "40px" }}>
                                <AccountBoxIcon style={{ marginRight: "10px" }} />
                                {student.playerInfo?.nickname}
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleViewButtonClick(student)}
                                    style={{ marginBottom: "10px" }}
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleInviteMembersBoxClose} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={infoBoxOpen}
                onClose={handleInfoBoxClose}
                aria-labelledby="info-box-title"
                aria-describedby="info-box-description"
            >
                <DialogTitle id="info-box-title">Information</DialogTitle>
                <DialogContent>
                    <DialogContentText id="info-box-description">
                        Vous visualisez la fiche de l'utilisateur : {selectedUser.username}.
                    </DialogContentText>
                </DialogContent>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ marginRight: "55px", marginLeft: "55px" }}
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

export default TeamInfos;
