import React from "react";
import {AppBar, Box, Button, IconButton, Switch, Toolbar} from "@mui/material";
import { useDarkMode } from 'usehooks-ts'
import {Castle} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import useColorMode from "../hooks/useColorMode";

function Navbar() {
    const { isDark, toggle } = useColorMode()
    const navigate = useNavigate()
    const pages = [{name: "Accueil", path: "/"}, {name: "About", path: "/about"}, {name: "Projects", path: "/projects"}, {name: "User Info", path: "/user_infos"}]
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
                    <Switch checked={isDark} onChange={toggle} />
                    <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar;