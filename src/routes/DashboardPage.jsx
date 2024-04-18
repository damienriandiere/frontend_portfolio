import { useState, useEffect } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import ProjectForm from "./ProjectForm";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AdminProjects() {
  const url_backend = import.meta.env.VITE_URL_BACKEND;
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectIdToDelete, setProjectIdToDelete] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:3000/projects/");
        setProjects(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des projets :", error);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (projectId) => {
    setDeleteDialogOpen(true);
    setProjectIdToDelete(projectId);
  };

  const handleConfirmDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `${url_backend}/projects/${projectIdToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ajoute le token dans l'en-tête Authorization
          },
        }
      );
      console.log(response.data);
      setProjects(projects.filter((project) => project._id !== projectIdToDelete));
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Erreur lors de la suppression du projet :", error);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedProject(null);
  };

  const handleCreateProject = (newProject) => {
    setProjects([...projects, newProject]);
    setShowForm(false);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Liste des projets (Admin)
      </Typography>
      {showForm ? (
        <ProjectForm onClose={handleCloseForm} onCreate={handleCreateProject} />
      ) : (
        <>
          <IconButton
            onClick={() => setShowForm(true)}
            aria-label="add project"
          >
            <AddIcon />
          </IconButton>
          <ul>
            {projects.map((project) => (
              <div
                key={project._id}
                style={{ marginRight: "20px", marginBottom: "20px" }}
              >
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
                    <IconButton
                      onClick={() => handleEdit(project)}
                      aria-label="edit project"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(project._id)}
                      aria-label="delete project"
                    >
                      <DeleteIcon />
                    </IconButton>
                    <Typography variant="body2" color="text.secondary">
                      {project.introductoryDescription}
                    </Typography>
                    <div>
                      {project.keywords
                        .sort((a, b) => a.length - b.length)
                        .slice(0, 3)
                        .map((keyword, index) => (
                          <Chip
                            key={index}
                            label={keyword}
                            variant="outlined"
                            color="primary"
                            style={{ marginRight: "5px", marginBottom: "5px" }}
                          />
                        ))}
                      {project.keywords.length > 3 && (
                        <Chip
                          label={`+${project.keywords.length - 3} more`}
                          variant="outlined"
                          color="primary"
                          style={{ marginRight: "5px", marginBottom: "5px" }}
                        />
                      )}
                    </div>
                  </CardContent>
                  <CardActions>
                    <Button
                      component={Link}
                      to={`/project/${project._id}`}
                      size="small"
                    >
                      En savoir plus
                    </Button>
                  </CardActions>
                </Card>
              </div>
            ))}
          </ul>
        </>
      )}
      {selectedProject && (
        <div>
          <Typography variant="h5">{selectedProject.title}</Typography>
          {/* Afficher les détails complets du projet ici */}
        </div>
      )}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmation de suppression"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Êtes-vous sûr de vouloir supprimer ce projet ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Annuler
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
