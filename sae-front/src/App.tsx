import React from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import ViewStudent from "./pages/ViewStudent";
import CreateTeam from "./pages/teams/CreateTeam";
import Subject from "./pages/Subject";
import Navbar from "./elements/Navbar";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { useTheme } from "./utils/theme";
import ProjectList from "./pages/projects/ProjectList";
import { AuthUserProvider } from "./contexts/AuthUserContext";
import { Toaster } from "react-hot-toast";
import TeamInfos from './pages/teams/TeamInfos';
import {RoleProtection} from "./components/RoleProtection";
import ProjectsInfosClient from './pages/projects/ProjectInfosClient';


function App() {
    const theme = useTheme()
    return (
        <ThemeProvider theme={theme} >
            <Toaster />
            <AuthUserProvider>
                <CssBaseline />
                <Box sx={{ marginTop: '80px' }}>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/projects" element={
                            <RoleProtection allowedRoles={["TEACHER"]} >
                                <ProjectList />
                            </RoleProtection>
                        } />
                        {/*<Route path="/projects/create" element={*/}
                        {/*    <RoleProtection>*/}
                        {/*        <About />*/}
                        {/*    </RoleProtection>*/}
                        {/*} />*/}
                        <Route path="/login" element={
                            <Login />
                        } />
                        <Route path="/login/createAccount" element={
                            <CreateAccount />
                        } />
                        <Route path="/students" element={
                            <RoleProtection>
                                <ViewStudent />
                            </RoleProtection>
                        } />
                        <Route path="/teams/create" element={
                            <RoleProtection allowedRoles={["STUDENT_INIT"]}>
                                <CreateTeam />
                            </RoleProtection>
                        } />
                        <Route path="/teams/infos" element={
                            <RoleProtection allowedRoles={["STUDENT_INIT"]}>
                                <TeamInfos />
                            </RoleProtection>
                        } />
                        <Route path="subject" element={
                            <RoleProtection allowedRoles={["TEACHER"]}>
                                <Subject />
                            </RoleProtection>
                        } />

                        <Route path="clients/projects" element={
                            <RoleProtection allowedRoles={["CLIENT"]}>
                                <ProjectsInfosClient />
                            </RoleProtection>
                        } />
                        {/*<Route path="students/team" element={*/}
                        {/*    <RoleProtection allowedRoles={["STUDENT_INIT"]}>*/}
                        {/*        <ViewStudentTeam />*/}
                        {/*    </RoleProtection>*/}
                        {/*    } />*/}

                    </Routes>
                </Box>
            </AuthUserProvider>
        </ThemeProvider>

    );
}

export default App;
