import {Box, Typography} from "@mui/material";
import React from "react";
import ProjectElement from "./ProjectElement";
import {Project} from "../../utils/Project";

function ProjectList () {
    const [projects, setProjects] =
        React.useState([{id:1, contact:null, name:'Thalès', description:'Je mange des macros excel, j adore 🤓🤓🤓'}] as Project[])
    return (
        <Box>
            <Typography variant={"h4"} sx={{m:2 }}>Projects</Typography>
            {projects.length === 0 && <Typography variant={"h5"} sx={{m:2 }}>No projects</Typography>}
            {projects.length > 0 && projects.map((project) => (
                <ProjectElement key={project.id} project={project}/>
            ))}
        </Box>
    )
}

export default ProjectList;