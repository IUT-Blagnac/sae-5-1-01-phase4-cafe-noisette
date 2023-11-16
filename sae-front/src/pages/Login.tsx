import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import { useState, ChangeEvent } from "react";

function CreateFormPage() {
  //Mise des valeurs par défauts
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <h1>Connexion à l'application</h1>
      <TextField
        id="outlined-basic"
        label="Username"
        variant="outlined"
        style={{ marginBottom: 30 }}
        value={username}
        onChange={handleUsernameChange}
      />
      <TextField
        id="outlined-basic"
        label="Password"
        variant="outlined"
        type="password"
        style={{ marginBottom: 30 }}
        value={password}
        onChange={handlePasswordChange}
      />

      <Button variant="contained" onClick={handleSubmit}>Se connecter</Button>

      <div style={{ display: "flex", alignItems: "center", marginTop: 10 }}>
        <p style={{ fontSize: 13, marginRight: 5 }}>Vous n'avez pas de compte ?</p>
        <Link href="/login/createAccount/" variant="body2">
          Créer un compte
        </Link>
      </div>

    </div>
  );
}

export default CreateFormPage;
