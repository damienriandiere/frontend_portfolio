import { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import Modal from '@mui/material/Modal';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    message: ''
  });
  const [error, setError] = useState("");
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCloseErrorModal = () => {
    setErrorModalOpen(false); // Ferme le modal d'erreur
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const { name, message } = formData;
  
    if (!name || !message) {
      setError("Veuillez remplir tous les champs");
      setErrorModalOpen(true);
      return;
    }
  
    const mailto = import.meta.env.VITE_MAILTO;
    const mailtoLink = `mailto:${mailto}?subject=${encodeURIComponent('Message de ' + name)}&body=${encodeURIComponent(message + '\n\n')}`;
    window.location.href = mailtoLink;
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '70px' }}>
      <Typography variant="h4" align="center" gutterBottom paragraph>
        Présentation personelle
      </Typography>
      <Typography variant="body1" align="justify" gutterBottom paragraph> 
        Je m&apos;appelle Damien Riandiere et je suis alternant à l&apos;école Nationale Supérieure des Ingénieurs du Mans (ENSIM).<br></br><br></br>
        Mon entreprise est Thales à Massy. Je suis actuellement en 4ème année de cycle ingénieur, en spécialité Informatique.
        Je suis passionné par l&apos;informatique depuis des années !<br></br><br></br>

        En effet, quand j&apos;étais adolescent, j&apos;ai commencé à m&apos;intéresser à l&apos;informatique en codant des serveurs sur le jeu Arma3.<br></br>
        Plus tard, au lycée, j&apos;ai choisi des options en informatique pour apprendre les bases de la programmation.
        Pour le baccalauréat, j&apos;ai réalisé un projet de Tower Defense en Python en utilisant la bibliothèque Pygame.<br></br><br></br>

        Depuis mon entrée à l&apos;ENSIM, j&apos;ai commencé un projet personnel que j&apos;ai nommé L&apos;Algo de Kerpo.
        <br></br>Il s&apos;agit d&apos;un algorithme qui pronostique les résultats de matchs de tennis, en se basant sur les statistiques des joueurs.
        Pour cela, j&apos;ai implémenté du scraping pour aller récupérer les données des matchs/joueurs, les côtes sur les sites de paris
        sportifs.<br></br> Puis j&apos;ai utilisé des algorithmes de machine learning pour prédire les résultats.<br></br>
        Enfin, j&apos;ai créé un bot Telegram afin de poster les prédictions dans un canal.
      </Typography>
      <Typography variant="h4" align="center" gutterBottom>
        Formulaire de Contact
      </Typography>
      <Typography variant="p" align="center" gutterBottom>
        Vous pouvez m&apos;envoyer un message en utilisant le formulaire ci-dessous :
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Nom*"
          name="name"
          value={formData.name}
          onChange={handleChange}
          InputProps={{ style: { color: 'white' } }}
          InputLabelProps={{ style: { color: 'white' } }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Message*"
          multiline
          rows={4}
          name="message"
          value={formData.message}
          onChange={handleChange}
          InputProps={{ style: { color: 'white' } }}
          InputLabelProps={{ style: { color: 'white' } }}
        />
        <Button type="submit" variant="contained" color="primary">
          Envoyer
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

export default Contact;