import {Box, Button, Card, FormControl, InputLabel, Select, Switch, Typography} from "@mui/material";
import React from "react";
import ProjectElement from "./ProjectElement";
import {Project} from "../../models/Project";
import TextField from "@mui/material/TextField";
import {User} from "../../models/User";
import {UserType} from "../../models/UserType";
import MenuItem from "@mui/material/MenuItem";

function ProjectList () {
    const [newProject, setNewProject] = React.useState({name:'', description:''} as Project)
    const [admin, setAdmin] = React.useState(false)
    const [contacts, setContacts] = React.useState([{id:1,email:'email@thales', username:'Bryva',firstname:'Bryce',lastname:'Fuertes',roles:[UserType.CONTACT]}] as User[])
    const [projects, setProjects] =
        React.useState([{id:1, contact:null, name:'Thalès', description:'Je mange des macros excel, j adore 🤓🤓🤓'},{id:1, contact:null, name:'Thalès', description:'Je mange des macros excel, j adore 🤓🤓🤓'},{id:1, contact:null, name:'Thalès', description:'Je mange des macros excel, j adore 🤓🤓🤓'}] as Project[])

    function handleAddProject () {
        if (newProject.name.trim.length <2 || newProject.description.trim.length < 5) {
            setProjects([...projects, {
                name: newProject.name.trim(),
                description: newProject.description.trim(),
                id: projects.length + 1,
                contact: null
            }])
            setNewProject({name:'', description:'',id:0,contact:null })
        }
    }

    return (
        <Box>
            <Typography variant={"h4"} sx={{m:2,display:'flex'}}>Projects</Typography>
            <Switch checked={admin} onChange={() => (setAdmin(!admin))}></Switch>
            {projects.length === 0 && <Typography variant={"h5"} sx={{m:2 }}>No projects</Typography>}
            <Box sx={{display:'flex', maxWidth:'100vw', flexFlow:'wrap'}}>
                {projects.length > 0 && projects.map((project) => (
                    <ProjectElement key={project.id} project={project} admin={admin}/>
                ))}

                {admin && <Card sx={{maxWidth:'300px', height:'300px', m:2,p:2, border:'2px dashed #ccc', borderRadius:'5px'}}>
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
                        <InputLabel>Contact</InputLabel>
                        <Select label={'Contact'} name={'Contact'} >
                            {contacts.map((contact) => (
                                <MenuItem key={contact.id} value={contact.id}>{contact.lastname} {contact.firstname}</MenuItem>
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