import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";

export default function Dashboard() {
  const url_backend = import.meta.env.VITE_URL_BACKEND;
  const [projects, setProjects] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectIdToDelete, setProjectIdToDelete] = useState(null);
  const [analytics, setAnalytics] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${url_backend}/api/projects/`);
        setProjects(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des projets :", error);
      }
    };

    const fetchAnalytics = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${url_backend}/api/projects/analytics/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setAnalytics(response.data.analytics);
    };

    fetchProjects();
    fetchAnalytics();
  }, [url_backend]);

  const handleDelete = async (projectId) => {
    setDeleteDialogOpen(true);
    setProjectIdToDelete(projectId);
  };

  const handleConfirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${url_backend}/api/projects/${projectIdToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setProjects(
        projects.filter((project) => project._id !== projectIdToDelete)
      );
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Erreur lors de la suppression du projet :", error);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <Container style={{ marginTop: "70px" }}>
      <Typography variant="h4" gutterBottom>
        Analytics
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card
            sx={{
              maxWidth: 345,
              "&:hover": {
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", // Ajoute une ombre au survol
                transform: "scale(1.05)", // Zoom sur la carte au survol
              },
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                Total Projects
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {analytics.totalProjects} projects
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card
            sx={{
              maxWidth: 345,
              "&:hover": {
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", // Ajoute une ombre au survol
                transform: "scale(1.05)", // Zoom sur la carte au survol
              },
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                Total Keywords
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {analytics.totalKeywords} keywords
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card
            sx={{
              maxWidth: 345,
              "&:hover": {
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", // Ajoute une ombre au survol
                transform: "scale(1.05)", // Zoom sur la carte au survol
              },
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                Mean Introductory Description
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {analytics.meanIntroductoryDescription} characters in average
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card
            sx={{
              maxWidth: 345,
              "&:hover": {
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", // Ajoute une ombre au survol
                transform: "scale(1.05)", // Zoom sur la carte au survol
              },
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                Mean Complete Description
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {analytics.meanCompleteDescription} characters in average
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Typography variant="h4" gutterBottom>
        Liste des projets
      </Typography>
      <IconButton
        component={Link}
        to="/new-project"
        aria-label="add project"
        style={{ color: "white" }}
      >
        <AddIcon />
        Add a project
      </IconButton>
      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid key={project._id} item xs={12} style={{ textAlign: "center" }}>
            <Card
              sx={{
                maxWidth: 345,
                "&:hover": {
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", // Ajoute une ombre au survol
                  transform: "scale(1.05)", // Zoom sur la carte au survol
                },
                margin: "auto", // Centre la carte horizontalement
              }}
            >
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
                  component={Link}
                  to={`/edit-project/${project._id}`}
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
                  to={`/projects/${project._id}`}
                  size="small"
                >
                  En savoir plus
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirmation de suppression
        </DialogTitle>
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
