import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";
import {Box, Dialog, Typography} from "@mui/material";
import UserInfos, {skillType} from "./UserInfos";

function CreateAccount() {
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [error, setError] = useState("");
    const initialSkills: skillType[] = [
        { label: 'Niveau global en projet de dev :', value: 1, color: 'secondary.main' },
        { label: 'Codage front :', value: 1, color: 'primary.main' },
        { label: 'Test :', value: 1, color: 'primary.main' },
        { label: 'Documentation :', value: 1, color: 'primary.main' },
        { label: 'Github / Scrumaster :', value: 1, color: 'primary.main' },
        { label: 'Design / Interface :', value: 1, color: 'primary.main' },
    ];

    const [skills, setSkills] = useState(initialSkills);
    const [customSkill, setCustomSkill] = useState({ label: '', value: 1 });
    const [openUserInfos, setOpenUserInfos] = useState(false);

    const navigate = useNavigate();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        switch (name) {
            case "username":
                setUsername(value);
                break;
            case "firstName":
                setFirstName(value);
                break;
            case "lastName":
                setLastName(value);
                break;
            case "password":
                setPassword(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "role":
                setRole(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = () => {
        if (!username || !firstName || !lastName || !password || !email || !role) {
            setError("Veuillez remplir tous les champs.");
            return;
        }

        setError("");

        console.log("Username:", username);
        console.log("First Name:", firstName);
        console.log("Last Name:", lastName);
        console.log("Password:", password);
        console.log("Email:", email);
        console.log("Role:", role);
    };

    const commonTextFieldStyle = {
        width: '20%',
        minWidth: 350,
        height: 50,
        marginBottom: 3,
    };

    const roleTextFieldStyle = {
        ...commonTextFieldStyle,
        marginBottom: 3,
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "80vh" }}>
            <h1>Création de votre compte</h1>
            <TextField
                name="username"
                label="Nom d'utilisateur"
                variant="outlined"
                sx={commonTextFieldStyle}
                value={username}
                onChange={handleChange}
            />
            <TextField
                name="firstName"
                label="Prénom"
                variant="outlined"
                sx={commonTextFieldStyle}
                value={firstName}
                onChange={handleChange}
            />
            <TextField
                name="lastName"
                label="Nom de famille"
                variant="outlined"
                sx={commonTextFieldStyle}
                value={lastName}
                onChange={handleChange}
            />
            <TextField
                name="password"
                label="Mot de passe"
                variant="outlined"
                type="password"
                sx={commonTextFieldStyle}
                value={password}
                onChange={handleChange}
            />
            <TextField
                name="email"
                label="Email"
                variant="outlined"
                sx={commonTextFieldStyle}
                value={email}
                onChange={handleChange}
            />
            <TextField
                name="role"
                select
                label="Type d'utilisateur"
                variant="outlined"
                sx={roleTextFieldStyle}
                value={role}
                onChange={handleChange}
            >
                <MenuItem value="TEACHER">Professeur</MenuItem>
                <MenuItem value="STUDENT_INIT">Étudiant initial</MenuItem>
                <MenuItem value="STUDENT_ALT">Étudiant alternant</MenuItem>
                <MenuItem value="CONTACT">Client</MenuItem>
                {/*<MenuItem value="ADMIN">Admin</MenuItem>*/}
            </TextField>
            <Button
                variant="outlined"
                disabled={role !== "STUDENT_INIT" && role !== "STUDENT_ALT"}
                sx={roleTextFieldStyle}
                onClick={() => setOpenUserInfos(true)}
            >
                Remplir la fiche personnage
            </Button>

            <Dialog open={openUserInfos} onClose={() => setOpenUserInfos(false)} fullWidth>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ m: 2 }}
                >
                    <Typography variant={'h4'}>
                        Fiche personnage
                    </Typography>
                    <Box
                        display="flex"
                        flexDirection="column"
                    >
                        <UserInfos skills={skills} setSkills={setSkills} customSkill={customSkill} setCustomSkill={setCustomSkill} />
                    </Box>
                </Box>
                <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="end"
                    mt={2}
                >
                    <Button variant="outlined" sx={{ mb: 1, mr: 1 }} onClick={() => {
                        setSkills(initialSkills)
                        setCustomSkill({ label: '', value: 1 })
                    }}>
                        Réinitialiser
                    </Button>
                    <Button variant="contained" sx={{ mb: 1, mr: 1 }} onClick={() => setOpenUserInfos(false)}>Valider</Button>
                </Box>
            </Dialog>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Button variant="contained" onClick={handleSubmit}>Créer votre compte</Button>
            <div style={{ display: "flex", alignItems: "center", marginTop: 10 }}>
                <p style={{ fontSize: 13, marginRight: 5 }}>Vous avez déjà un compte ?</p>
                <Link variant="body2" sx={{
                    '&:hover': {
                        cursor: 'pointer',
                    },
                }} onClick={() => navigate('/login')}>
                    Se connecter
                </Link>
            </div>
        </Box>
    );
}

export default CreateAccount;
