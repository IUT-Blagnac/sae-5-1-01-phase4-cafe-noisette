import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import { useState, ChangeEvent } from "react";
import {useNavigate} from "react-router-dom";

function CreateFormPage() {
    //Mise des valeurs par défauts
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    //Gère la soumission lors de l'envoie du formulaire
    const handleSubmit = () => {
        console.log("Username:", username);
        console.log("Password:", password);
    };


    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "80vh" }}>
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

            <Button variant="contained" onClick={handleSubmit}>Se connecter</Button>

            <div style={{ display: "flex", alignItems: "center", marginTop: 10 }}>
                <p style={{ fontSize: 13, marginRight: 5 }}>Vous n'avez pas de compte ?</p>
                <Link variant="body2" sx={{
                    '&:hover': {
                        cursor: 'pointer',
                    },
                }} onClick={() => navigate('/login/createAccount')}>
                    Créer un compte
                </Link>
            </div>

        </div>
    );
}

export default CreateFormPage;
