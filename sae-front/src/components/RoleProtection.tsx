import {useAuthUser} from "../contexts/AuthUserContext";
import {ReactNode, useEffect, useState} from "react";
import {UserRole} from "../models/User";
import {Box} from "@mui/material";

export const RoleProtection = (props: { allowedRoles?: UserRole[]; children: ReactNode }) => {
    const { allowedRoles, children } = props
    const user = useAuthUser()
    const [isUserInRole, setIsUserInRole] = useState(false);

    useEffect(() => {
        if (user.user) {
            if (allowedRoles) {
                const roleFound = allowedRoles?.find(role => user.user?.roles.find(r => r === role || r === "ADMIN"))
                const isInRole = roleFound ? roleFound.length > 0 : false
                setIsUserInRole(isInRole)
            } else {
                setIsUserInRole(true)
            }
        }
    }, [allowedRoles, user.user]);

    return (
        <>
            {!user.user || !isUserInRole ? (
                <Box sx={{
                    textAlign: "center"
                }}>
                    <h1>Erreur 403<br/>Vous n'avez pas la permission d'accéder à cette page</h1>
                </Box>
            ) : children}
        </>
    )
}