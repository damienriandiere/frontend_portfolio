import { useState } from "react";
import axios from "axios";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import Modal from "@mui/material/Modal";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const admin_code = import.meta.env.VITE_ADMIN_CODE;
  const url_backend = localStorage.getItem("url_backend");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Veuillez remplir tous les champs");
      setErrorModalOpen(true); // Ouvre le modal d'erreur
      return;
    }

    var admin;
    if (role === admin_code) {
      admin = true;
    } else {
      admin = false;
    }

    try {
      const response = await axios.post(`${url_backend}/api/auth/register`, {
        name,
        email,
        password,
        admin,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      if (admin === true) {
        localStorage.setItem("admin", true);
      } else {
        localStorage.setItem("admin", false);
      }
      window.location.href = "/";
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      setError(
        "Une erreur s'est produite lors de l'inscription. Veuillez réessayer."
      );
      setErrorModalOpen(true); // Ouvre le modal d'erreur
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Inscription
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Nom*"
          name="name"
          value={name}
          onChange={handleNameChange}
          InputProps={{ style: { color: "white" } }}
          InputLabelProps={{ style: { color: "white" } }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Adresse E-mail*"
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          InputProps={{ style: { color: "white" } }}
          InputLabelProps={{ style: { color: "white" } }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Mot de passe*"
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          InputProps={{ style: { color: "white" } }}
          InputLabelProps={{ style: { color: "white" } }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Code*"
          name="code"
          value={role}
          onChange={handleRoleChange}
          InputProps={{ style: { color: "white" } }}
          InputLabelProps={{ style: { color: "white" } }}
        />
        <Button type="submit" variant="contained" color="primary">
          S&apos;inscrire
        </Button>
      </Box>
      <Modal
        open={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        aria-labelledby="error-modal-title"
        aria-describedby="error-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            variant="h6"
            id="error-modal-title"
            sx={{ color: "black" }}
            gutterBottom
          >
            Erreur
          </Typography>
          <Typography
            variant="body1"
            id="error-modal-description"
            sx={{ color: "black" }}
            gutterBottom
          >
            {error}
          </Typography>
          <Button
            onClick={() => setErrorModalOpen(false)}
            variant="contained"
            color="primary"
          >
            Fermer
          </Button>
        </Box>
      </Modal>
    </Container>
  );
}
