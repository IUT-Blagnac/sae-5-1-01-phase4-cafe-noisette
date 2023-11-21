import {createTheme} from "@mui/material";
import useColorMode from "../hooks/useColorMode";

export const useTheme = () =>{
    const { isDark } = useColorMode()

    if(isDark) {
        return createTheme( {
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
    } else {
        return createTheme( {
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
    }
}

