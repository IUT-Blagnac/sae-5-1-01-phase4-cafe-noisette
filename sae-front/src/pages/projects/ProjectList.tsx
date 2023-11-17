import {Box, Typography} from "@mui/material";
import React from "react";
import ProjectElement from "./ProjectElement";
import {Project} from "../../utils/Project";

function ProjectList () {
    const [projects, setProjects] =
        React.useState([{name: "test", description: "test", id: 1, contact: null} as Project])
    return (
        <Box>
            <Typography variant={"h4"}>Projects</Typography>
            {projects.map((project) => (
                <ProjectElement key={project.id} project={project}/>
            ))}
        </Box>
    )
}

export default ProjectList;