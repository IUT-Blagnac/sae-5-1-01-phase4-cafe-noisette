import React from "react";
import {AppBar, Box, Button, IconButton, Menu, Switch, Toolbar} from "@mui/material";
import { useDarkMode } from 'usehooks-ts'
import {Castle} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {useAuthUser} from "../contexts/AuthUserContext";
import MenuItem from "@mui/material/MenuItem";

function Navbar() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { isDarkMode, toggle } = useDarkMode()
    const navigate = useNavigate()
    const pages = [{name: "Accueil", path: "/"}, {name: "À propos", path: "/about"}, {name: "Projects", path: "/projects"}]
    const authUser = useAuthUser();

    const handleClose = () => {
        setAnchorEl(null);
    };

    function handleDisconnect() {
        authUser.disconnect()
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
                        {pages.map((page) => (
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
                    { authUser.token &&
                    <Box sx={{display:"flex"}}>
                        <Button color="inherit" onClick={(event) =>  setAnchorEl(event.currentTarget)}>{authUser.user?.username}</Button>
                        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                            {/*<MenuItem onClick={() => {navigate('/profile'); handleClose()}}>Profile</MenuItem>*/}
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