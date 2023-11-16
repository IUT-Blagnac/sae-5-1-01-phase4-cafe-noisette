import { ThemeOptions } from '@mui/material/styles';
import {createTheme} from "@mui/material";

export const themeOptions: ThemeOptions = createTheme( {
    palette: {
        mode: 'dark',
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#9c27b0',
        },
    },
});

