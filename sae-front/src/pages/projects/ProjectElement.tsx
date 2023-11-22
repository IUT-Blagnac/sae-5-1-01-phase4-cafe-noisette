import React from "react";
import {Box, Button, Card, IconButton, Typography} from "@mui/material";
import {Project} from "../../models/Project";
import {Delete, Edit} from "@mui/icons-material";
import Link from "@mui/material/Link";

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
            <Card sx={{maxWidth:'300px',minWidth:'300px', height:'300px', m:2,p:2}}>
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
                <Link>{project.contact?.username}</Link>
                <Button variant={"contained"} sx={{width:'100%'}} onClick={handleSelect}>Select this project</Button>
            </Card>
        </Box>
    )
}

export default ProjectElement;