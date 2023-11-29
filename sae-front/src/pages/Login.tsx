import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import React, { useState, ChangeEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "../rest/queries";
import { useAuthUser } from "../contexts/AuthUserContext";
import CustomSnackbar from "../elements/CustomSnackbar";

function CreateFormPage() {
    //Mise des valeurs par défauts
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorSnackbar, setErrorSnackbar] = useState(false);
    const [errorSnackbarMessage, setErrorSnackbarMessage] = useState("");
    const navigate = useNavigate();
    const authUser = useAuthUser();

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    //Gère la soumission lors de l'envoie du formulaire
    const handleSubmit = () => {
        login(username, password).then((response) => {
            if (response.responseCode === 200) {
                if (response.data) {
                    authUser.updateToken(response.data.token);
                    authUser.refreshUser();
                }
                navigate("/projects");
            } else {
                console.log("Error while logging in: " + response.errorMessage);
                setErrorSnackbarMessage('Le nom d\'utilisateur ou le mot de passe est incorrect')
                setErrorSnackbar(true)
            }
        });
    };

    return (
        <>
            {authUser.token ? (
                <Navigate to={"/"}/>
            ) : (
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", height: "80vh"}}>
                    <h1>Connexion à l'application</h1>
                    <TextField
                        label="Nom d'utilisateur"
                        variant="outlined"
                        sx={{
                            width: '20%',
                            minWidth: 350,
                            height: 50,
                            marginBottom: 3,
                        }}
                        value={username}
                        onChange={handleUsernameChange}
                    />
                    <TextField
                        label="Mot de passe"
                        variant="outlined"
                        type="password"
                        sx={{
                            width: '20%',
                            minWidth: 350,
                            height: 50,
                            marginBottom: 3,
                        }}
                        value={password}
                        onChange={handlePasswordChange}
                    />

                    <Button variant="contained" onClick={handleSubmit} disabled={username.trim().length<1||password.length<1}>Se connecter</Button>

                    <div style={{display: "flex", alignItems: "center", marginTop: 10}}>
                        <p style={{fontSize: 13, marginRight: 5}}>Vous n'avez pas de compte ?</p>
                        <Link variant="body2" sx={{
                            '&:hover': {
                                cursor: 'pointer',
                            },
                        }} onClick={() => navigate('/login/createAccount')}>
                            Créer un compte
                        </Link>
                    </div>
                    <CustomSnackbar snackbarOpen={errorSnackbar} setSnackbarOpen={setErrorSnackbar} severity={"error"} alertText={errorSnackbarMessage} />
                </div>
            )}
        </>
    );
}

export default CreateFormPage;
