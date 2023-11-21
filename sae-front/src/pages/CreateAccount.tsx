import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

function CreateAccount() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
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
    marginBottom: 10,
  };

  const roleTextFieldStyle = {
    ...commonTextFieldStyle,
    marginBottom: 30,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "80vh" }}>
      <h1>Création de votre compte</h1>
      <TextField
        name="username"
        label="Nom d'utilisateur"
        variant="outlined"
        style={commonTextFieldStyle}
        value={username}
        onChange={handleChange}
      />
      <TextField
        name="firstName"
        label="Prénom"
        variant="outlined"
        style={commonTextFieldStyle}
        value={firstName}
        onChange={handleChange}
      />
      <TextField
        name="lastName"
        label="Nom de famille"
        variant="outlined"
        style={commonTextFieldStyle}
        value={lastName}
        onChange={handleChange}
      />
      <TextField
        name="password"
        label="Mot de passe"
        variant="outlined"
        type="password"
        style={commonTextFieldStyle}
        value={password}
        onChange={handleChange}
      />
      <TextField
        name="email"
        label="Email"
        variant="outlined"
        style={commonTextFieldStyle}
        value={email}
        onChange={handleChange}
      />
      <TextField
        name="role"
        select
        label="Type d'utilisateur"
        variant="outlined"
        style={roleTextFieldStyle}
        value={role}
        onChange={handleChange}
      >
        <MenuItem value="TEACHER">Teacher</MenuItem>
        <MenuItem value="STUDENT">Student</MenuItem>
        <MenuItem value="CONTACT">Contact</MenuItem>
        <MenuItem value="ADMIN">Admin</MenuItem>
      </TextField>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Button variant="contained" onClick={handleSubmit}>Créer votre compte</Button>
    </div>
  );
}

export default CreateAccount;
