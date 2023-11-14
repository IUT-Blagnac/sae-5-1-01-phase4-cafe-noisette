import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./elements/Navbar";
import {Box, CssBaseline, ThemeProvider} from "@mui/material";
import Footer from "./elements/Footer";
import {themeOptions} from "./utils/theme";

function App() {
    const [value, setValue] = React.useState(0);
    return (
        <ThemeProvider theme={themeOptions} >
            <CssBaseline />
                <Box sx={{marginTop:'80px'}}>
                        <Navbar/>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                        </Routes>
                        <Footer/>
                </Box>
        </ThemeProvider>

    );
}

export default App;
