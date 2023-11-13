import {createTheme} from "@mui/material";
import {blue} from "@mui/material/colors";


export default class theme {
    static theme = createTheme({
        palette: {
            primary: {
                main: blue[500],
            },
        },
    });
}