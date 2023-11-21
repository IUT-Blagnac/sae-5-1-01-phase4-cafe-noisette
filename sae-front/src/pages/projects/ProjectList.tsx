import {Box, Button, Card, Switch, Typography} from "@mui/material";
import React from "react";
import ProjectElement from "./ProjectElement";
import {Project} from "../../models/Project";
import TextField from "@mui/material/TextField";

function ProjectList () {
    const [admin, setAdmin] = React.useState(false)
    const [projects, setProjects] =
        React.useState([{id:1, contact:null, name:'Thalès', description:'Je mange des macros excel, j adore 🤓🤓🤓'}] as Project[])
    return (
        <Box>
            <Typography variant={"h4"} sx={{m:2 }}>Projects</Typography>
            <Switch checked={admin} onChange={() => (setAdmin(!admin))}></Switch>
            {projects.length === 0 && <Typography variant={"h5"} sx={{m:2 }}>No projects</Typography>}
            {projects.length > 0 && projects.map((project) => (
                <ProjectElement key={project.id} project={project} admin={admin}/>
            ))}
            {admin && <Card sx={{maxWidth:'300px', height:'200px', m:2,p:2, borderStyle:'dotted'}}>
                <TextField label={'Nom du projet'}></TextField>
                <TextField label={'Description du projet'}></TextField>
            </Card>}
        </Box>
    )
}

export default ProjectList;