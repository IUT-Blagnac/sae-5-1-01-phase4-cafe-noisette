import React from "react";
import {
    Box,
    Button,
    Card,
    FormControl,
    IconButton,
    InputLabel,
    Select,
    SelectChangeEvent,
    Typography
} from "@mui/material";
import {Project} from "../../models/Project";
import {Delete, Edit} from "@mui/icons-material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {User} from "../../models/User";

interface ProjectElementProps {
    project: Project,
    admin: boolean
    handleRemoveProject: (project: Project) => void
    clients: User[]
    handleUpdateProject: (project: Project) => void
}

function ProjectElement (props: ProjectElementProps) {
    const {project, admin, handleRemoveProject, clients, handleUpdateProject} = props
    const [open, setOpen] = React.useState(false);
    const [updateProject, setUpdateProject] = React.useState({name:'', description:'', clientIds:[]} as Project)
    const [selectedClientsIds, setSelectedClientsIds] = React.useState([] as number[])

    function handleClose () {
        setOpen(false)
    }

    function handleUpdate () {
        setOpen(true)
        setUpdateProject(project)
    }

    function handleSelect () {

    }

    function selectClients (event: SelectChangeEvent<unknown>) {
        setSelectedClientsIds(event.target.value as number[])
        setUpdateProject({...updateProject, clientIds:selectedClientsIds})
    }

    return (
        <Box>
            <Card sx={{maxWidth:'400px',minWidth:'400px', height:'400px', m:2,p:2,display:'flex', flexDirection:'column',justifyContent:'space-between'}}>

                <Box sx={{display:'flex',justifyContent:'space-between'}}>
                    <Typography variant={"h4"}>{project.name}</Typography>
                    {admin &&
                        <Box sx={{minWidth:'5em', display:''}}>
                            <IconButton onClick={handleUpdate}>
                                <Edit/>
                            </IconButton>
                            <IconButton onClick={() => handleRemoveProject(project)}>
                                <Delete/>
                            </IconButton>
                        </Box>
                    }
                </Box>
                <Typography variant={"body1"} sx={{height:'8 em'}}>{project.description}</Typography>
                <Typography>{project.clientIds.map((id) => clients.find((client) => client.id === id)?.username).join(', ')}</Typography>
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
                    <Card sx={{maxWidth:'400px', p:2, borderRadius:'5px'}}>
                        <TextField label={'Nom du projet'} value={updateProject.name} error={updateProject.name.trim().length<2}  size={'small'} onChange={(event) => setUpdateProject({...updateProject, name:event.target.value})} sx={{width:'100%'}}/>
                        <TextField
                            error={updateProject.description.trim().length<5}
                            onChange={(event) => setUpdateProject({...updateProject, description:event.target.value})}
                            sx={{mt:2,width:'100%'}}
                            label={'Description'}
                            value={updateProject.description}
                            style={{textAlign: 'left'}}
                            multiline
                            rows={6}
                        />
                        <FormControl fullWidth sx={{mt:2}} size={'small'} >
                            <InputLabel>Client</InputLabel>
                            <Select label={'Clients'} multiple value={selectedClientsIds} name={'Clients'} onChange={(event) => selectClients(event)}>
                                {clients.map((client) => (
                                    <MenuItem key={client.id} value={client.id}>{client.lastname} {client.firstname}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Card>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Annuler</Button>
                    <Button onClick={() => (handleUpdateProject(updateProject), handleClose())} autoFocus>
                        Modifier
                    </Button>
                </DialogActions>
            </Dialog>

        </Box>
    )
}

export default ProjectElement;