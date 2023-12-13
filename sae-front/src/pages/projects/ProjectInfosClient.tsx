import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, Select, SelectChangeEvent, Typography } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import ProjectElement from "./ProjectElement";
import { Project } from "../../models/Project";
import TextField from "@mui/material/TextField";
import { User } from "../../models/User";
import MenuItem from "@mui/material/MenuItem";
import { getClients, getProjects, getStudents, getTeams, postProject, putProject } from "../../rest/queries";
import { useAuthUser } from "../../contexts/AuthUserContext";
import toast from "react-hot-toast";
import { Team } from "../../models/Team";

function ProjectsInfosClient() {
    const authUser = useAuthUser();

    const [projects, setProjects] = React.useState([] as Project[])
    const [teams, setTeams] = React.useState([] as Team[])
    const [students, setStudents] = React.useState([] as User[])
    const [infoBoxOpen, setInfoBoxOpen] = useState(false);
    const [notationBoxOpen, setNotationBoxOpen] = useState(false);
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
    const handleViewButtonClick = (student: User) => {
        setSelectedUser(student);
        setInfoBoxOpen(true);
    }

    const handleInfoBoxClose = () => {
        setInfoBoxOpen(false);
      };

      const handleNotationButtonClick = (team: Team) => {
        setNote(-1)
        setTitleNote('')
        setDescriptionNote('')
        setSelectedTeam(team)
        setNotationBoxOpen(true);
    }

    const handleNotationBoxClose = () => {
        setNotationBoxOpen(false);
      };

    const handleSaveNote = () => {
        if(titleNote === ''){
            toast.error('La note doit avoir un titre')
            return
        }
        if(descriptionNote === ''){
            toast.error('La note doit avoir une description')
            return
        }
        if(note === -1){
            toast.error('Aucune note attribuée, un nombre doit être choisi')
            return
        }
        toast.success('La note a été ajouté')
        handleNotationBoxClose();
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

    return (
        <Box>
            <Typography variant={"h4"} sx={{ m: 2, display: 'flex' }}>Projects</Typography>
            {projects.length === 0 && <Typography variant={"h5"} sx={{ m: 2 }}>No projects</Typography>}
            <Box sx={{ display: 'flex', maxWidth: '100vw', flexFlow: 'wrap' }}>
                {projects.length > 0 && projects.map((project, projectIndex) => (
                    <Box key={projectIndex} sx={{
                        border: '1px solid #000',
                        marginBottom: '20px',
                        width: '90%',
                        margin: '0 auto',
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
                                    <Card sx={{ marginBottom: '5px', width: '80%', marginLeft: '10%'}}>
                                            <Button color='primary' sx={{ width: '100%', backgroundColor: 'primary' }} onClick={() => handleNotationButtonClick(team)}> NOTER L'EQUIPE {team.name}</Button>
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
        open={notationBoxOpen}
        onClose={handleNotationBoxClose}
        aria-labelledby="info-box-title"
        aria-describedby="info-box-description"
      >
        <DialogTitle id="info-box-title" color="primary" sx={{ textTransform: 'uppercase', textAlign: 'center' }}>
          SAISIE DES NOTES POUR L'EQUIPE : {selectedTeam.name}
        </DialogTitle>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{ marginRight: '55px', marginLeft: '55px', textTransform: 'uppercase' }}
        >
            <TextField
            name="title"
            label="Titre"
            variant="outlined"
            value={titleNote}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: '20px', marginTop: '20px'}}
            />
            <TextField
            name="description"
            label="Description"
            variant="outlined"
            value={descriptionNote}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: '20px', marginTop: '20px'}}
            />
            <Typography>NOTE</Typography>
        <Box sx={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
        {Array.from({ length: 41 }, (_, index) => index * 0.5).map((number) => (
      <Button
        key={number}
        variant="contained"
        onClick={() => handleNoteClick(number)}
        color={note === number ? 'primary' : 'inherit'}
        sx={{ margin: '5px'}}
      >
        {number}
      </Button>
    ))}
        </Box>

        </Box>
        <DialogActions>
          <Button onClick={handleNotationBoxClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleSaveNote} color="primary">
            NOUVELLE NOTE
          </Button>
        </DialogActions>
      </Dialog>

            <Dialog
                open={infoBoxOpen}
                onClose={handleInfoBoxClose}
                aria-labelledby="info-box-title"
                aria-describedby="info-box-description"
            >
                <DialogTitle id="info-box-title" color="primary" sx={{textTransform: 'uppercase', textAlign: 'center'}}>Informations</DialogTitle>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ marginRight: "55px", marginLeft: "55px", textTransform: 'uppercase'}}
                >
                    <p>NOM : {selectedUser.lastname}</p>
                    <p>PRENOM : {selectedUser.firstname}</p>
                    <p>EMAIL : {selectedUser.email}</p>


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