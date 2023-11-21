import {createTheme} from "@mui/material";
import {useDarkMode} from "usehooks-ts";
import {useEffect, useState} from "react";

const darkTheme = createTheme( {
    palette: {
        mode: 'dark',
        primary: {
            main: '#FFA500',
        },
        secondary: {
            main: '#800080',
        },
    },
})

const lightTheme = createTheme( {
    palette: {
        mode: 'light',
        primary: {
            main: '#800080',
        },
        secondary: {
            main: '#FFA500',
        },
    },
})

export const useTheme = () =>{
    const { isDarkMode } = useDarkMode()
    const [theme, setTheme] = useState(isDarkMode ? darkTheme : lightTheme);

    useEffect(() => {
        setTheme(isDarkMode ? darkTheme : lightTheme)
    }, [isDarkMode]);

    return theme
}

