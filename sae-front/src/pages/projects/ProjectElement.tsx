import React from "react";
import {Box, Button, Card, IconButton, Typography} from "@mui/material";
import {Project} from "../../models/Project";
import {Delete, Edit} from "@mui/icons-material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";

interface ProjectElementProps {
    project: Project,
    admin: boolean
    handleRemoveProject: (project: Project) => void
}

function ProjectElement (props: ProjectElementProps) {
    const {project, admin, handleRemoveProject} = props
    const [open, setOpen] = React.useState(false);

    function handleClose () {
        setOpen(false)
    }

    function handleOpen () {
        setOpen(true)
    }

    function handleSelect () {

    }

    return (
        <Box>
            <Card sx={{maxWidth:'300px',minWidth:'300px', height:'300px', m:2,p:2,display:'flex', flexDirection:'column',justifyContent:'space-between'}}>

                <Box sx={{display:'flex',justifyContent:'space-between'}}>
                    <Typography variant={"h4"}>{project.name}</Typography>
                    {admin &&
                        <Box sx={{minWidth:'5em'}}>
                            <IconButton onClick={handleOpen}>
                                <Edit/>
                            </IconButton>
                            <IconButton onClick={() => handleRemoveProject(project)}>
                                <Delete/>
                            </IconButton>
                        </Box>
                    }
                </Box>
                <Typography variant={"body1"}>{project.description}</Typography>
                <Typography>{project.client?.username}</Typography>
                <Button variant={"contained"} sx={{width:'100%'}} onClick={handleSelect}>Select this project</Button>

            </Card>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Edit project
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>

        </Box>
    )
}

export default ProjectElement;