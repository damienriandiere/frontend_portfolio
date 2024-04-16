import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function MediaCard() {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:3000/project/");
        setProjects(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des projets :", error);
      }
    };

    fetchProjects();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProjects = projects.filter(project =>
    project.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const renderProjects = searchTerm === '' ? projects : filteredProjects;

  return (
    <Container maxWidth="md" style={{ marginTop: '50px' }}>
      <Typography gutterBottom variant="h4" component="div">
        Liste des projets réalisés
      </Typography>
      <TextField
        label="Rechercher par mot-clé"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px' }}
        InputProps={{ style: { color: 'white' } }}
        InputLabelProps={{ style: { color: 'white' } }}
      />
       {renderProjects.map((project) => (
        <div key={project.id} className='div-with-margins'>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 140 }}
              image={project.thumbnailImage}
              title={project.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {project.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {project.introductoryDescription}
              </Typography>
              <div>
                {project.keywords.map((keyword, index) => (
                  <Chip key={index} label={keyword} variant="outlined" color="primary" style={{ marginRight: '5px', marginBottom: '5px' }} />
                ))}
              </div>
            </CardContent>
            <CardActions>
              <Button size="small">En savoir plus</Button>
            </CardActions>
          </Card>
        </div>
      ))}
    </Container>
  );
}