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
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
 

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const url_backend = localStorage.getItem("url_backend");
        const response = await axios.get(`${url_backend}/api/projects/`);
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
    <Container style={{ marginTop: '70px' }}>
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
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {renderProjects.map((project) => (
          <div key={project.id} style={{ marginRight: '20px', marginBottom: '20px' }}>
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
                  {project.keywords
                    .sort((a, b) => a.length - b.length)
                    .slice(0, 3)
                    .map((keyword, index) => (
                      <Chip key={index} label={keyword} variant="outlined" color="primary" style={{ marginRight: '5px', marginBottom: '5px' }} />
                    ))}
                  {project.keywords.length > 3 && (
                    <Chip label={`+${project.keywords.length - 3} more`} variant="outlined" color="primary" style={{ marginRight: '5px', marginBottom: '5px' }} />
                  )}
                </div>
              </CardContent>
              <CardActions>
                <Button component={Link} to={`/project/${project._id}`} size="small">En savoir plus</Button>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
    </Container>
  );
}