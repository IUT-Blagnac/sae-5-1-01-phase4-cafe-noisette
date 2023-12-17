import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, InputLabel, Select, SelectChangeEvent, Typography } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import ProjectElement from "./ProjectElement";
import { Project } from "../../models/Project";
import TextField from "@mui/material/TextField";
import { User } from "../../models/User";
import MenuItem from "@mui/material/MenuItem";
import { createGrade, deleteGrade, getClients, getGrades, getProjects, getStudents, getTeams, postProject, putProject } from "../../rest/queries";
import { useAuthUser } from "../../contexts/AuthUserContext";
import toast from "react-hot-toast";
import { Team } from "../../models/Team";
import { Grade } from "../../models/Grade";

function ProjectsInfosClient() {
    const authUser = useAuthUser();

    const [projects, setProjects] = React.useState([] as Project[])
    const [teams, setTeams] = React.useState([] as Team[])
    const [students, setStudents] = React.useState([] as User[])
    const [grades, setGrades] = React.useState([] as Grade[])
    const [infoBoxOpen, setInfoBoxOpen] = useState(false);
    const [newNoteBoxOpen, setNewNoteBoxOpen] = useState(false);
    const [viewNotesBoxOpen, setViewNotesBoxOpen] = useState(false);

    const [note, setNote] = useState(-1);
    const [titleNote, setTitleNote] = useState('');
    const [descriptionNote, setDescriptionNote] = useState('');

    const [selectedUser, setSelectedUser] = React.useState({} as User);
    const [selectedTeam, setSelectedTeam] = React.useState({} as Team);




    useEffect(() => {
        if (authUser.user !== undefined) {
            requestProject();
            requestTeams();
            requestStudents();
            requestGrades();
        }
    }, [authUser.user]);

    function requestProject() {
        getProjects().then((response) => {
            if (response.responseCode === 200 && response.data) {
                const projectsClient = response.data.filter((project) => project.clientIds.includes(authUser.user?.id as number));
                if (projectsClient.length > 0) {
                    setProjects(projectsClient);
                } else {
                    toast.error('Aucun projet attribué')
                }
            } else {
                console.log("Error while getting projects: " + response.errorMessage);
            }
        }
        )
    }

    function requestTeams() {
        getTeams().then((response) => {
            if (response.responseCode === 200 && response.data) {
                setTeams(response.data);
            } else {
                console.log("Error while getting teams: " + response.errorMessage);
            }
        }
        )
    }

    function requestStudents() {
        getStudents().then((response) => {
            if (response.responseCode === 200 && response.data) {
                setStudents(response.data);
            } else {
                console.log("Error while getting students: " + response.errorMessage);
            }
        }
        )
    }

    function requestGrades() {
        getGrades().then((response) => {
            if (response.responseCode === 200 && response.data) {
                setGrades(response.data);
                console.log(response.data)
            } else {
                console.log("Error while getting students: " + response.errorMessage);
            }
        }
        )
    }

    const handleViewButtonClick = (student: User) => {
        setSelectedUser(student);
        setInfoBoxOpen(true);
    }

    const handleInfoBoxClose = () => {
        setInfoBoxOpen(false);
    };

    const handleViewNotesButtonClick = (team: Team) => {
        setSelectedTeam(team)
        setViewNotesBoxOpen(true);

    }

    const handleNewNoteButtonClick = (team: Team) => {
        setNote(-1)
        setTitleNote('')
        setDescriptionNote('')
        setSelectedTeam(team)
        setNewNoteBoxOpen(true);
    }

    const handleNewNoteBoxClose = () => {
        setNewNoteBoxOpen(false);
    };
    const handleViewNotesBoxClose = () => {
        setViewNotesBoxOpen(false);
    };

    const handleSaveNote = () => {
        if (titleNote === '') {
            toast.error('La note doit avoir un titre')
            return
        }
        if (descriptionNote === '') {
            toast.error('La note doit avoir une description')
            return
        }
        if (note === -1) {
            toast.error('Aucune note attribuée, un nombre doit être choisi')
            return
        }
        const grade = { title: titleNote, description: descriptionNote, grade: note, coefficient: 1, type: 'CLIENT', teamId: selectedTeam.id as number };
        createGrade(grade).then((response) => {
            if (response.responseCode === 200) {
                if (response.data) {
                    toast.success('La note a été ajouté')
                    setGrades([...grades, response.data]);
                }
            } else {
                console.log("Une erreur est survenue lors de la création d'une note (erreur " + response.responseCode + ")")
            }
        })

        handleNewNoteBoxClose();
    };

    const handleNoteClick = (selectedNote: number) => {
        setNote(selectedNote);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        switch (name) {
            case "title":
                setTitleNote(value);
                break;
            case "description":
                setDescriptionNote(value);
                break;
            default:
                break;
        }
    };

    const handleSupprimerClick = (grade: Grade) => {
        deleteGrade(grade).then((response) => {
            if (response.responseCode === 200) {
                toast.success('La note a été supprimée');
                setGrades((prevGrades) => prevGrades.filter((g) => g.id !== grade.id));
            } else {
                console.log("Une erreur est survenue lors de la suppression d'une note (erreur " + response.responseCode + ")")
            }
        })
    }

    return (
        <Box>
            {projects.length === 0 && <Typography variant={"h4"} color='primary' sx={{ m: 2, textAlign: 'center', textTransform: 'uppercase', width: '100%' }}>Aucun projet</Typography>}
            <Box sx={{ display: 'flex', maxWidth: '100vw', flexFlow: 'wrap' }}>
                {projects.length > 0 && projects.map((project, projectIndex) => (
                    <Box key={projectIndex} sx={{
                        border: '1px solid #000',
                        width: '90%',
                        margin: '0 auto 20px',
                        borderRadius: '10px',
                        textAlign: 'left',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        paddingBottom: "20px",
                        paddingTop: "20px"
                    }}>
                        <Box sx={{
                            textTransform: 'uppercase',
                            marginLeft: '10px',
                            fontWeight: 'bold',
                            fontSize: '32px',
                            marginBottom: '20px'
                        }}>
                            Equipes du projet : {project.name}
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {teams.filter((team) => team.projectId === project.id).length > 0 && teams.filter((team) => team.projectId === project.id).map((team, teamIndex) => (
                                <Box key={teamIndex}>
                                    <Card sx={{ height: '400px', width: '400px', m: 2, p: 2, display: 'flex', flexDirection: 'column', }}>
                                        <Typography variant={"h4"} sx={{ marginBottom: '20px', textAlign: 'center' }}>{team.name}</Typography>
                                        {students.filter((student) => student.teamId === team.id).map((student, studentIndex) => (
                                            <Card key={studentIndex} sx={{ marginBottom: '5px' }}>
                                                <Button color='inherit' sx={{ width: '100%' }} onClick={() => handleViewButtonClick(student)}><Typography style={{ marginRight: '5px' }}> {student.firstname} {student.lastname} </Typography> {student.id === team.leaderId && <Typography color='primary'> [LEADER] </Typography>}</Button>
                                            </Card>
                                        ))}



                                    </Card>
                                    <Card sx={{ marginBottom: '5px', width: '80%', marginLeft: '10%' }}>
                                        <Button color='inherit' sx={{ width: '100%' }} onClick={() => handleViewNotesButtonClick(team)}> VOIR LES NOTES</Button>
                                    </Card>
                                    <Card sx={{ marginBottom: '5px', width: '80%', marginLeft: '10%' }}>
                                        <Button color='primary' sx={{ width: '100%' }} onClick={() => handleNewNoteButtonClick(team)}> NOUVELLE NOTE</Button>
                                    </Card>
                                </Box>
                            ))}
                            {teams.filter((team) => team.projectId === project.id).length === 0 && (
                                <Typography color="primary" sx={{ fontSize: '20px', textTransform: 'uppercase' }}>Aucune équipe sur ce projet</Typography>
                            )}
                        </Box>
                    </Box>
                ))}

                <Dialog
                    open={newNoteBoxOpen}
                    onClose={handleNewNoteBoxClose}
                    aria-labelledby="info-box-title"
                    aria-describedby="info-box-description"
                >
                    <DialogTitle id="info-box-title" color="primary" sx={{ textTransform: 'uppercase', textAlign: 'center' }}>
                        NOUVELLE NOTE POUR L'EQUIPE : {selectedTeam.name}
                    </DialogTitle>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        sx={{ marginRight: '55px', marginLeft: '55px', textTransform: 'uppercase', marginBottom: "10px" }}
                    >
                        <TextField
                            name="title"
                            label="Titre"
                            variant="outlined"
                            value={titleNote}
                            onChange={handleChange}
                            fullWidth
                            sx={{ marginBottom: '20px', marginTop: '20px' }}
                        />
                        <TextField
                            name="description"
                            label="Description"
                            variant="outlined"
                            value={descriptionNote}
                            onChange={handleChange}
                            fullWidth
                            sx={{ marginBottom: '20px', marginTop: '20px' }}
                        />
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
                            {Array.from({ length: 41 }, (_, index) => index * 0.5).map((number) => (
                                <Button
                                    key={number}
                                    variant="contained"
                                    onClick={() => handleNoteClick(number)}
                                    color={note === number ? 'primary' : 'inherit'}
                                    sx={{ margin: '5px' }}
                                >
                                    {number}
                                </Button>
                            ))}
                        </Box>

                    </Box>
                    <DialogActions>
                        <Button onClick={handleNewNoteBoxClose} color="primary">
                            Annuler
                        </Button>
                        <Button onClick={handleSaveNote} color="primary">
                            NOUVELLE NOTE
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={viewNotesBoxOpen}
                    onClose={handleViewNotesBoxClose}
                    aria-labelledby="info-box-title"
                    aria-describedby="info-box-description"
                >
                    <DialogTitle id="info-box-title" color="primary" sx={{ textTransform: 'uppercase', textAlign: 'center' }}>NOTES DE L'EQUIPE : {selectedTeam.name}</DialogTitle>
                    <Box
                        display="flex"
                        justifyContent="center"
                        flexWrap="wrap"
                        sx={{ marginRight: "55px", marginLeft: "55px" }}
                    >
                        {grades
                            .filter((grade) => grade.teamId === selectedTeam.id)
                            .map((grade) => (
                                <Box key={grade.id} sx={{ border: '1px solid #000', padding: '10px', margin: '10px', width: '200px', borderRadius: '8px', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
                                    <Box sx={{ textTransform: 'uppercase', textDecoration: 'underline', marginBottom: '10px' }}>{grade.title}</Box>
                                    <Box sx={{ marginBottom: '10px', flex: 1 }}>{grade.description}</Box>
                                    <Divider />
                                    <p>NOTE: {grade.grade}</p>
                                    <Button variant="outlined" onClick={() => handleSupprimerClick(grade)}>Supprimer</Button>
                                </Box>
                            ))}

                        {grades.filter((grade) => grade.teamId === selectedTeam.id).length === 0 && (
                            <Box>Aucune note</Box>
                        )}

                    </Box>
                    <DialogActions>
                        <Button onClick={handleViewNotesBoxClose} color="primary">
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
                    <DialogTitle id="info-box-title" color="primary" sx={{ textTransform: 'uppercase', textAlign: 'center' }}>Informations</DialogTitle>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        sx={{ marginRight: "55px", marginLeft: "55px", textTransform: 'uppercase' }}
                    >
                        <p>NOM : {selectedUser.lastname}</p>
                        <p>PRENOM : {selectedUser.firstname}</p>


                    </Box>
                    <DialogActions>
                        <Button onClick={handleInfoBoxClose} color="primary">
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box >
    )
}

export default ProjectsInfosClient;