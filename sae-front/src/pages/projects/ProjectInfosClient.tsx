import { Box, Button, Card, FormControl, InputLabel, Select, SelectChangeEvent, Typography } from "@mui/material";
import React, { useEffect } from "react";
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

    return (
        <Box>
            <Typography variant={"h4"} sx={{ m: 2, display: 'flex' }}>Projects</Typography>
            {projects.length === 0 && <Typography variant={"h5"} sx={{ m: 2 }}>No projects</Typography>}
            <Box sx={{ display: 'flex', maxWidth: '100vw', flexFlow: 'wrap' }}>
                {projects.length > 0 && projects.map((project, projectIndex) => (
                    <Box key={projectIndex} sx={{
                        border: '1px solid #000',
                        marginBottom: '10px',
                        width: '90%',
                        margin: '0 auto',
                        borderRadius: '10px',
                        textAlign: 'left',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
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
                            alignItems: 'center'
                        }}>
                            {teams.filter((team) => team.projectId === project.id).length > 0 && teams.filter((team) => team.projectId === project.id).map((team, teamIndex) => (
                                <Box key={teamIndex}>
                                    <Card sx={{ height: '400px', width: '400px', m: 2, p: 2, display: 'flex', flexDirection: 'column', }}>
                                        <Typography variant={"h4"} sx={{ marginBottom: '20px', textAlign: 'center' }}>{team.name}</Typography>
                                        {students.filter((student) => student.teamId === team.id).map((student, studentIndex) => (
                                            <Card key={studentIndex} sx={{ marginBottom: '5px' }}>
                                                <Button color='inherit' sx={{ width: '100%' }} onClick={() => console.log(student)}><Typography style={{ marginRight: '5px' }}> {student.firstname} {student.lastname} </Typography> {student.id === team.leaderId && <Typography color='primary'> [LEADER] </Typography>}</Button>
                                            </Card>
                                        ))}


                                    </Card>
                                </Box>
                            ))}
                            {teams.filter((team) => team.projectId === project.id).length === 0 && (
                                <Typography color="primary" sx={{ fontSize: '20px', textTransform: 'uppercase' }}>Aucune équipe sur ce projet</Typography>
                            )}
                        </Box>
                    </Box>
                ))}




            </Box>
        </Box >
    )
}

export default ProjectsInfosClient;