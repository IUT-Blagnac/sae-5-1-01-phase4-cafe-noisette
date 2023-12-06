import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import ViewStudent from "./pages/ViewStudent";
import Navbar from "./elements/Navbar";
import {Box, CssBaseline, ThemeProvider} from "@mui/material";
import {useTheme} from "./utils/theme";
import ProjectList from "./pages/projects/ProjectList";
import {AuthUserProvider} from "./contexts/AuthUserContext";
import {Toaster} from "react-hot-toast";

function App() {
    const theme = useTheme()
    return (
        <ThemeProvider theme={theme} >
            <Toaster/>
            <AuthUserProvider>
                <CssBaseline />
                <Box sx={{marginTop:'80px'}}>
                    <Navbar/>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/projects" element={<ProjectList />} />
                        {/*<Route path="/user_infos" element={<UserInfos />} />*/}
                        <Route path="/projects/create" element={<About />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/login/createAccount" element={<CreateAccount />} />
                        <Route path="/ViewStudent" element={<ViewStudent />} />
                    </Routes>
                </Box>
            </AuthUserProvider>
        </ThemeProvider>

    );
}

export default App;
