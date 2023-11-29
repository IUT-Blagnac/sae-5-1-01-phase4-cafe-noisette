import React, { useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface CustomSnackbarProps {
    snackbarOpen: boolean;
    setSnackbarOpen: (open: boolean) => void;
    severity?: 'success' | 'info' | 'warning' | 'error';
    alertText: string;
    position?: { vertical: 'top' | 'bottom', horizontal: 'left' | 'center' | 'right' };
    autoHideDuration?: number;
}

function CustomSnackbar(props: CustomSnackbarProps) {
    const { snackbarOpen,setSnackbarOpen, severity, alertText, position = { vertical: 'top', horizontal: 'center' }, autoHideDuration = 3000 } = props;


    useEffect(() => {
        setSnackbarOpen(snackbarOpen);
    }, [snackbarOpen]);

    const handleClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Snackbar
            open={snackbarOpen}
            autoHideDuration={autoHideDuration}
            onClose={handleClose}
            anchorOrigin={position}
        >
            <Alert severity={severity} onClose={handleClose} variant={"filled"}>
                {alertText}
            </Alert>
        </Snackbar>
    );
}


export default CustomSnackbar;