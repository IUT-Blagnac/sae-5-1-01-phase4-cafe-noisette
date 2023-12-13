import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Typography } from "@mui/material";
import { addPreferencesTeam, getStudents, getStudentsByUsername, getTeamsWithTeamId } from "../../rest/queries";
import { User } from "../../models/User";
import { skillType } from "../UserInfos";
import UserInfosView from "../UserInfosView";
import { useAuthUser } from "../../contexts/AuthUserContext";
import { Team } from "../../models/Team";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ProjectPreferencesSelect } from "../../components/ProjectPreferencesSelect";
import { Project } from "../../models/Project";

function TeamInfos() {
    const [students, setStudents] = React.useState<User[]>([])
    const [projects, setProjects] = React.useState<Project[]>([])
    const [team, setTeam] = React.useState<Team>({} as Team)
    const [skills, setSkills] = React.useState<skillType[]>([])
    const [selectedUser, setSelectedUser] = React.useState<User>({} as User);
    const [infoBoxOpen, setInfoBoxOpen] = useState(false);
    const authUser = useAuthUser();
    const navigate = useNavigate();

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
        })
    }

    function requestTeam() {
        const teamId = authUser.user?.teamId as number;
        getTeamsWithTeamId(teamId).then((response) => {
            if (response.responseCode === 200) {
                if (response.data) {
                    setTeam(response.data[0])
                    if (response.data[0].preferencesId.length === 0) {
                        toast.error("Aucune préférence des sujets définie")
                    }
                    console.log(response.data[0].preferencesId)
                }
            } else {
                console.log("Error while getting team: " + response.errorMessage);
            }
        }
        )
    }

    const handleUpdatePreferencesButtonClick = () => {
        const projectIds = projects.map((project) => project.id as number);
        if (JSON.stringify(projectIds) === JSON.stringify(team.preferencesId)) {
            toast.success("Aucun changement détecté")
            return
        }
        team.preferencesId = projectIds
        addPreferencesTeam(team, team.id as number).then((response) => {
            if (response.responseCode === 200) {
                if (response.data) {
                    toast.success("Mise à jour des préférences effectuée")
                }
            } else {
                console.log("Une erreur est survenue lors de la mise à jour des préférences (erreur " + response.responseCode + ")")
            }
        }
        ).catch((error) => {
            console.log("Une erreur est survenue lors de la mise à jour de l'étudiant")
        })
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

    const handleInfoBoxClose = () => {
        setInfoBoxOpen(false);
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
            {team.leaderId === authUser.user?.id && (
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => navigate("/students")}
                    style={{ marginRight: "10px" }}
                >
                    Inviter des membres
                </Button>
            )}

            {team.leaderId === authUser.user?.id && (
                <Box
                    sx={{ marginTop: 5, marginBottom: 3, paddingTop: 3, paddingBottom: 3, width: '50%', marginLeft: '25%', border: "1px solid #ccc", borderRadius: '10px' }}>
                    <Typography sx={{ textTransform: 'uppercase', fontSize: '28px' }}>Selection des préférences des sujets</Typography>

                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        marginTop="20px"
                        marginBottom="20px"
                    >
                        <ProjectPreferencesSelect projects={projects} setProjects={setProjects} preferenceIds={team.preferencesId} />
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleUpdatePreferencesButtonClick()}
                        style={{ marginRight: "10px", width: '50%' }}
                    >
                        <Typography>Mettre à jour</Typography>
                    </Button>
                </Box>
            )}



            {/* Boîtes d'informations */}
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

        </div>
    );
}

export default TeamInfos;
