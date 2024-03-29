import React from "react";
import { AppBar, Box, Button, IconButton, Menu, Switch, Toolbar } from "@mui/material";
import { useDarkMode } from 'usehooks-ts'
import { Castle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "../contexts/AuthUserContext";
import MenuItem from "@mui/material/MenuItem";
import toast from "react-hot-toast";

function Navbar() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { isDarkMode, toggle } = useDarkMode()
    const navigate = useNavigate()
    const authUser = useAuthUser();
    // eslint-disable-next-line no-lone-blocks
    {/* Mise en place des contidions d'affichage de la navbar*/}
    const pages = [ {name: "Accueil", path: "/", isVisible: true},
                    {name: "À propos", path: "/about",  isVisible: true},
                    {name: "Projets", path: "/projects",  isVisible: authUser.user?.roles.includes('TEACHER')},
                    {name: "Étudiants", path: "/students",  isVisible: authUser.user?.teamId!==null && authUser.user?.roles.includes('STUDENT_INIT')},
                    {name: "Création d'équipe", path: "/teams/create",  isVisible: authUser.user?.teamId===null && authUser.user?.roles.includes('STUDENT_INIT')},
                    {name: "Mon équipe", path: "teams/infos",  isVisible: (authUser.user?.roles.includes('STUDENT_INIT') && authUser.user.teamId!==null ) || (authUser.user?.roles.includes('STUDENT_ALT') && authUser.user.teamId!==null)},
                    { name: "Mes projets", path: "/clients/projects", isVisible: authUser.user?.roles.includes('CLIENT') },
                  ]

    const handleClose = () => {
        setAnchorEl(null);
    };

    function handleDisconnect() {
        authUser.disconnect()
        setAnchorEl(null)
        toast.success('Déconnexion réussie');
        navigate('/')
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => navigate('/')}
                    >
                        <Castle />
                    </IconButton>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {/*Filtrage des pages selon le filtre "isVisible" */}
                        {pages.filter(page => page.isVisible || authUser.user?.roles.includes('ADMIN')).map((page) =>(
                            <Button
                                key={page.name}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                                onClick={() => navigate(page.path)}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>
                    <Switch checked={isDarkMode} onChange={toggle} />
                    <Box hidden={!!authUser.token}> <Button color="inherit" onClick={() => navigate('/login')}>Login</Button> </Box>
                    {authUser.token &&
                        <Box sx={{ display: "flex" }}>
                            <Button color="inherit" onClick={(event) => setAnchorEl(event.currentTarget)}>{authUser.user?.username}</Button>
                            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                                {/*<MenuItem onClick={() => {navigate('/profile'); handleClose()}}>Profile</MenuItem>*/}
                                {authUser.user?.roles.includes('ADMIN') && <MenuItem onClick={() => {navigate('/admin'); handleClose()}}>Page admin</MenuItem>}
                                <MenuItem onClick={() => handleDisconnect()}>Déconnexion</MenuItem>
                            </Menu>
                        </Box>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar;