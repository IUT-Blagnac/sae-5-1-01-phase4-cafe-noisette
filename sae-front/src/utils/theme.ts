import {createTheme} from "@mui/material";
import {useDarkMode} from "usehooks-ts";

export const useTheme = () =>{
    const { isDarkMode } = useDarkMode()

    if(isDarkMode) {
        return createTheme( {
            palette: {
                mode: 'dark',
                primary: {
                    main: '#1976d2',
                },
                secondary: {
                    main: '#9c27b0',
                },
            },
        })
    } else {
        return createTheme( {
            palette: {
                mode: 'light',
                primary: {
                    main: '#1976d2',
                },
                secondary: {
                    main: '#9c27b0',
                },
            },
        })
    }
}

