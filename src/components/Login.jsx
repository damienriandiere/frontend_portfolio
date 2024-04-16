import  { useState } from 'react';
import axios from 'axios'; 
import { TextField, Button, Box, Typography, Container } from '@mui/material';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      window.location.href = '/successful_logged';
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
    }
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
          InputProps={{ style: { color: 'white' } }}
          InputLabelProps={{ style: { color: 'white' } }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Mot de passe *"
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          InputProps={{ style: { color: 'white' } }}
          InputLabelProps={{ style: { color: 'white' } }}
        />
        <Button type="submit" variant="contained" color="primary">
          Se connecter
        </Button>
      </Box>
    </Container>
  );
}

export default Login;