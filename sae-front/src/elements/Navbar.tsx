import React from "react";
import {AppBar, Box, Button, IconButton, Switch, Toolbar, Typography} from "@mui/material";
import { useDarkMode } from 'usehooks-ts'
import {Castle} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

function Navbar() {
    const { isDarkMode, toggle } = useDarkMode()
    const navigate = useNavigate()
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
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        SAE Koh-Lanta
                    </Typography>
                    <Switch checked={isDarkMode} onChange={toggle} />
                    <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar;