import {Box, Button, Card, FormControl, InputLabel, Select, Typography} from "@mui/material";
import React, {useEffect} from "react";
import ProjectElement from "./ProjectElement";
import {Project} from "../../models/Project";
import TextField from "@mui/material/TextField";
import {User} from "../../models/User";
import MenuItem from "@mui/material/MenuItem";
import {getProjects} from "../../rest/queries";
import {useAuthUser} from "../../contexts/AuthUserContext";

function ProjectList () {
    const [newProject, setNewProject] = React.useState({name:'', description:''} as Project)
    const authUser = useAuthUser();
    const editRights = authUser.user?.roles.includes('TEACHER') || authUser.user?.roles.includes('ADMIN')
    const [clients, setClients] = React.useState([{id:1,email:'email@thales', username:'Bryva',firstname:'Bryce',lastname:'Fuertes',roles:['CONTACT']}] as User[])
    const [projects, setProjects] = React.useState([] as Project[])

    useEffect(() => {
        requestProjects();
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

    function handleAddProject () {
        if (newProject.name.trim().length >= 2 && newProject.description.trim().length >= 5) {
            setProjects([...projects, {
                name: newProject.name.trim(),
                description: newProject.description.trim(),
                id: projects.length + 1,
                client: newProject.client
            }])
            setNewProject({name:'', description:'',id:0,client: null})
        }
    }

    function handleRemoveProject (project: Project) {
        setProjects(projects.filter((p) => p.id !== project.id))
    }

    function handleUpdateProject (updatedProject: Project) {
        setProjects(projects.map((project) => {
            if (project.id === updatedProject.id) {
                return updatedProject
            }
            return project
        }))
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
                        <Select label={'Client'} value={newProject.client?.id} onChange={(event) => setNewProject({...newProject, client:clients.find((client) => client.id === event.target.value)})}>
                                <MenuItem key={0} value={''}></MenuItem>
                            {clients.map((client) => (
                                <MenuItem key={client.id} value={client.id}>{client.lastname} {client.firstname}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button variant={'outlined'} sx={{mt:2}} onClick={handleAddProject}>Ajouter un nouveau projet</Button>
                </Card>}
            </Box>
        </Box>
)
}

export default ProjectList;