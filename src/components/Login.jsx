import { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Modal,
} from "@mui/material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Veuillez remplir tous les champs");
      setErrorModalOpen(true); // Ouvre le modal d'erreur
      return;
    }

    try {
      const url_backend = import.meta.env.VITE_URL_BACKEND;
      const url = url_backend + "/api/auth/login";
      const response = await axios.post(url, {
        email,
        password,
      });
      const admin = response.data.tokens.userProfile.admin;
      const token = response.data.tokens.accessToken;
      if (admin === true) {
        localStorage.setItem("admin", true);
      } else {
        localStorage.setItem("admin", false);
      }
      localStorage.setItem("token", token);
      window.location.href = "/";
    } catch (e) {
      console.error("Erreur lors de la connexion:", e);
      console.log(error);
      setError(
        "Une erreur s'est produite lors de la connexion. Veuillez réessayer."
      );
      setErrorModalOpen(true); // Ouvre le modal d'erreur
    }
  };

  const handleCloseErrorModal = () => {
    setErrorModalOpen(false); // Ferme le modal d'erreur
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Connectez-vous
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Adresse E-mail *"
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
          label="Mot de passe *"
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          InputProps={{ style: { color: "white" } }}
          InputLabelProps={{ style: { color: "white" } }}
        />
        <Button type="submit" variant="contained" color="primary">
          Se connecter
        </Button>
      </Box>
      <Modal
        open={errorModalOpen}
        onClose={handleCloseErrorModal}
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
          <Typography variant="h6" id="error-modal-title" sx={{ color: "black" }} gutterBottom>
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
            onClick={handleCloseErrorModal}
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
