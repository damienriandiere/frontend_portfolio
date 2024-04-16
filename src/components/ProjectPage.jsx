import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function MediaCard() {
  const [projects, setProjects] = useState([]);

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

  return (
    <div className="project-list">
        {projects.map((project) => (
            <div key={project.id} className='div-with-margins'>
          <Card   sx={{ maxWidth: 345 }}>
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
          </CardContent>
          <CardActions>
            <Button size="small">En savoir plus</Button>
          </CardActions>
        </Card>
        </div>
        ))}
      </div>
  );
}
