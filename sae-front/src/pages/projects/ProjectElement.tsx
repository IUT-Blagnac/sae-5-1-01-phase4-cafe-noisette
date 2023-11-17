import React from "react";
import {Box, Card, Typography} from "@mui/material";
import {Project} from "../../utils/Project";

interface ProjectElementProps {
    project: Project
}

function ProjectElement (props: ProjectElementProps) {
    const {project} = props
    return (
        <Box>
            <Card>
                <Typography variant={"h5"} sx={{width:'25em'}}>{project.name}</Typography>
            </Card>
        </Box>
    )
}

export default ProjectElement;