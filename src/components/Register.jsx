import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { TextField, Button, Box, Typography, Container } from '@mui/material';

function Register() {
    const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

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
    var admin;
    if (role == 'admin'){
        admin = true;
    } else {
        admin = false;
    }

    try {
        const response = await axios.post('http://localhost:3000/auth/register', {
            name,
            email,
            password,
            admin
        });
        const token = response.data.token;
        localStorage.setItem('token', token);
        navigate('/');
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
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
          InputProps={{ style: { color: 'white' } }}
          InputLabelProps={{ style: { color: 'white' } }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Adresse E-mail*"
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
          label="Mot de passe*"
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          InputProps={{ style: { color: 'white' } }}
          InputLabelProps={{ style: { color: 'white' } }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Code*"
          name="code"
          value={role}
          onChange={handleRoleChange}
          InputProps={{ style: { color: 'white' } }}
          InputLabelProps={{ style: { color: 'white' } }}
        />
        <Button type="submit" variant="contained" color="primary">
          S&apos;inscrire
        </Button>
      </Box>
    </Container>
  );
}

export default Register;