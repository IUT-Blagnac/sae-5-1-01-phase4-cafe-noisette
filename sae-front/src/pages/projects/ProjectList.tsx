import {Box, Button, Card, FormControl, InputLabel, Select, Typography} from "@mui/material";
import React, {useEffect} from "react";
import ProjectElement from "./ProjectElement";
import {Project} from "../../models/Project";
import TextField from "@mui/material/TextField";
import {User} from "../../models/User";
import MenuItem from "@mui/material/MenuItem";
import {getClients, getProjects, postProject, putProject} from "../../rest/queries";
import {useAuthUser} from "../../contexts/AuthUserContext";
import toast from "react-hot-toast";

function ProjectList () {
    const [newProject, setNewProject] = React.useState({name:'', description:''} as Project)
    const authUser = useAuthUser();
    const editRights = authUser.user?.roles.includes('TEACHER') || authUser.user?.roles.includes('ADMIN')
    const [clients, setClients] = React.useState([] as User[])
    const [projects, setProjects] = React.useState([] as Project[])

    useEffect(() => {
        requestProjects();
        requestClients();
    }, []);

    function requestProjects () {
        getProjects().then((response) => {
                if (response.responseCode === 200) {
                    if (response.data) {
                        setProjects(response.data);
                    }
                } else {
                    console.log("Error while getting projects: " + response.errorMessage);
                }
            }
        )
    }

    function requestClients () {
        getClients().then((response) => {
                if (response.responseCode === 200) {
                    if (response.data) {
                        console.log('ok'+response.data)
                        setClients(response.data);
                    }
                } else {
                    console.log("Error while getting projects: " + response.errorMessage);
                    toast.error('Une erreur est survenue lors de la récupération des clients')
                }
            }
        ).catch((error) => {
            toast.error('Une erreur est survenue lors de la récupération des clients')
        }
        )
    }

    function handleAddProject () {
        if (newProject.name.trim().length<2) {
            toast('Le nom du projet doit contenir au moins 2 caractères',{icon:'❕'})
            return
        }
        if (newProject.description.trim().length<5) {
            toast('La description du projet doit contenir au moins 5 caractères',{icon:'❕'})
            return
        }
        if (!newProject.client) {
            toast('Le projet doit être associé à un client',{icon:'❕'})
            return
        }
        postProject(newProject).then((response) => {
            if (response.responseCode === 200) {
                if (response.data) {
                    setProjects([...projects, response.data]);
                    setNewProject({name:'', description:'', client:clients[0], id:0})
                }
            } else {
                console.log("Error while getting projects: " + response.errorMessage)
                toast.error('Une erreur est survenue lors de la création du projet (erreur '+response.responseCode+')')
            }
        }).catch((error) => {
            toast('Une erreur est survenue lors de la création du projet')
        })
    }

    function handleRemoveProject (project: Project) {
        setProjects(projects.filter((p) => p.id !== project.id))
    }

    function handleUpdateProject (updatedProject: Project) {
        putProject(updatedProject).then((response) => {
            if (response.responseCode === 200) {
                if (response.data) {
                    setProjects(projects.map((project) => project.id === updatedProject.id ? updatedProject : project))
                }
            } else {
                console.log("Error while getting projects: " + response.errorMessage)
                toast.error('Une erreur est survenue lors de la mise à jour du projet (erreur '+response.responseCode+')')
            }
        }
        ).catch((error) => {
            toast('Une erreur est survenue lors de la mise à jour du projet')
        })
    }

    return (
        <Box>
            <Typography variant={"h4"} sx={{m:2,display:'flex'}}>Projects</Typography>
            {projects.length === 0 && <Typography variant={"h5"} sx={{m:2 }}>No projects</Typography>}
            <Box sx={{display:'flex', maxWidth:'100vw', flexFlow:'wrap'}}>
                {projects.length > 0 && projects.map((project) => (
                    <ProjectElement key={project.id} project={project} admin={true} handleRemoveProject={handleRemoveProject} clients={clients} handleUpdateProject={handleUpdateProject}/>
                ))}

                {editRights && <Card sx={{maxWidth:'400px', height:'400px', m:2,p:2, border:'2px dashed #ccc', borderRadius:'5px'}}>
                    <TextField label={'Nom du projet'} error={newProject.name.trim().length<2}  size={'small'} onChange={(event) => setNewProject({...newProject, name:event.target.value})} sx={{mt:2,width:'100%'}}/>
                    <TextField
                        error={newProject.description.trim().length<5}
                        onChange={(event) => setNewProject({...newProject, description:event.target.value})}
                        sx={{mt:2,width:'100%'}}
                        label={'Description'}
                        style={{textAlign: 'left'}}
                        multiline
                        rows={2}
                    />
                    <FormControl fullWidth sx={{mt:2}} size={'small'}>
                        <InputLabel>Client</InputLabel>
                        <Select label={'Client'}  value={newProject.client ? newProject.client.id : ''} onChange={(event) => setNewProject({...newProject, client:clients.find((client) => client.id === event.target.value)})}>
                            {clients.map((client) => (
                                <MenuItem key={client.id} value={client.id}>{client.lastname} {client.firstname}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button variant={'outlined'} sx={{mt:2}} onClick={handleAddProject}>Ajouter un nouveau projet</Button>
                </Card>
                }
            </Box>
        </Box>
    )
}

export default ProjectList;