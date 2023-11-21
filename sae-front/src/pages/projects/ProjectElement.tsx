import React from "react";
import {Box, Button, Card, Typography} from "@mui/material";
import {Project} from "../../utils/Project";

interface ProjectElementProps {
    project: Project
}

function ProjectElement (props: ProjectElementProps) {
    const {project} = props

    function handleSelect () {

    }

    return (
        <Box>
            <Card sx={{maxWidth:'300px', height:'200px', m:2,p:2}}>
                <Typography variant={"h4"}>{project.name}</Typography>
                <Typography variant={"body1"}>{project.description}</Typography>
                <Button variant={"contained"} sx={{width:'100%'}} onClick={handleSelect}>Select this project</Button>
            </Card>
        </Box>
    )
}

export default ProjectElement;