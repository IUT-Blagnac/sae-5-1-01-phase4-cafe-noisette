import TextField from "@mui/material/TextField";
import { useState, ChangeEvent } from "react";

function CreateFormPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

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

      <button  onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default CreateFormPage;
