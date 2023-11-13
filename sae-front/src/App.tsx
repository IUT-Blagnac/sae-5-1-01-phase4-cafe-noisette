import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./elements/Navbar";
import {Box, ThemeProvider} from "@mui/material";
import theme from "./utils/theme";
import Footer from "./elements/Footer";

function App() {
    return (
        <Box sx={{backgroundColor:("rgb(15,15,15)")}}>
            <ThemeProvider theme={theme}>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                </Routes>
                <Footer/>
            </ThemeProvider>
        </Box>
    );
}

export default App;
