import React from "react";
import {Box, Button, Card, IconButton, Typography} from "@mui/material";
import {Project} from "../../models/Project";
import {Delete, Edit} from "@mui/icons-material";

interface ProjectElementProps {
    project: Project,
    admin: boolean
}

function ProjectElement (props: ProjectElementProps) {
    const {project, admin} = props

    function handleSelect () {

    }

    return (
        <Box>
            <Card sx={{maxWidth:'300px', height:'200px', m:2,p:2}}>
                <Box sx={{display:'flex'}}>
                    <Typography variant={"h4"}>{project.name}</Typography>
                    {admin &&
                        <Box>
                        <IconButton>
                            <Edit/>
                        </IconButton>
                        <IconButton>
                            <Delete/>
                        </IconButton>
                        </Box>
                    }
                </Box>
                <Typography variant={"body1"}>{project.description}</Typography>
                <Button variant={"contained"} sx={{width:'100%'}} onClick={handleSelect}>Select this project</Button>
            </Card>
        </Box>
    )
}

export default ProjectElement;