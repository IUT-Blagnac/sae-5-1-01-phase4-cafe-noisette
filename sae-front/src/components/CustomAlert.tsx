import { useAuthUser } from "../contexts/AuthUserContext";
import { ReactNode, useEffect, useState } from "react";
import { UserRole } from "../models/User";
import { Alert, AlertColor, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const CustomAlert = (props: { text: String; typeAlert: AlertColor }) => {
    const { text, typeAlert } = props;

    return (
        <>
            {text !== "" && (
                <Alert
                    variant="filled"
                    severity={typeAlert}
                    sx={{
                        position: 'fixed',
                        top: 14,
                        zIndex: 9999,
                        left: '50%',
                        transform: 'translateX(-50%)',
                    }}
                >
                    {text}
                </Alert >
            )}
        </>
    );
};