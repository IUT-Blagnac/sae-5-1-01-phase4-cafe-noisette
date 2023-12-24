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
import {getProjectClients, Project} from "../../models/Project";
import {Delete, Edit} from "@mui/icons-material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {User} from "../../models/User";
import {useTheme} from "../../utils/theme";

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
    const theme = useTheme();

    function handleOpenUpdate () {
        setOpen(true)
        setUpdateProject(project)
    }

    function handleCloseUpdate () {
        setOpen(false)
    }

    function selectClients (event: SelectChangeEvent<unknown>) {
        setSelectedClientsIds(event.target.value as number[])
        setUpdateProject({...updateProject, clientIds:event.target.value as number[]})
    }

    return (
        <Box>
            <Card sx={{maxWidth:'400px',minWidth:'400px', height:'400px', m:2,p:2,display:'flex', flexDirection:'column',justifyContent:'space-between'}}>
                <Box aria-label={"Title"} sx={{height:'15%', pb:1}}>
                    <Typography variant={"h4"}>{project.name}</Typography>
                </Box>
                <Box aria-label={"Description"} sx={{height:'60%', backgroundColor:theme.palette.background.default, borderRadius:1,padding:1}}>
                    <Typography variant={"body1"} >{project.description}</Typography>
                </Box>
                <Box aria-label={"Clients"} sx={{height:'25%', pt:1}}>
                    {getProjectClients(project,clients).map((client) => (
                        <Typography key={client.id} variant={"body1"}>{client.firstname} {client.lastname} - {client.email}</Typography>
                    ))}
                    {project.clientIds.length === 0 && <Typography variant={"body1"}>Pas de client</Typography>}
                </Box>
                {admin &&
                    <Box sx={{minWidth:'5em', display:''}}>
                        <IconButton onClick={handleOpenUpdate}>
                            <Edit/>
                        </IconButton>
                        <IconButton onClick={() => handleRemoveProject(project)}>
                            <Delete/>
                        </IconButton>
                    </Box>
                }
            </Card>

            <Dialog
                open={open}
                onClose={handleCloseUpdate}
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
                            inputProps={{ maxLength: 500 }}
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
                    <Button onClick={handleCloseUpdate}>Annuler</Button>
                    <Button onClick={() => {
                        handleUpdateProject(updateProject)
                        handleCloseUpdate()
                    }} autoFocus>
                        Modifier
                    </Button>
                </DialogActions>
            </Dialog>

        </Box>
    )
}

export default ProjectElement;