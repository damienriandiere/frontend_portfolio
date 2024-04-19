import { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Box, Container } from "@mui/material";
import { useParams } from "react-router-dom";

export default function ProjectForm() {
  const url_backend = localStorage.getItem("url_backend");
  const { projectId } = useParams();
  const url = window.location.href;
  let [edit, setEdit] = useState(false);
  if (url.includes("edit")) {
    edit = true;
  } else {
    edit = false;
  }

  const [title, setTitle] = useState("");
  const [introductoryDescription, setIntroductoryDescription] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState("");
  const [completeDescription, setCompleteDescription] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [image5, setImage5] = useState("");
  const [project, setProject] = useState({
    title: "",
    introductoryDescription: "",
    thumbnailImage: "",
    completeDescription: "",
    keywords: [],
    illustrationImages: [],
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(
          `${url_backend}/api/projects/${projectId}`
        );
        const projectData = response.data;
        setProject(projectData);
        setEdit(true); // Définir edit à true car c'est une édition
      } catch (error) {
        console.error("Erreur lors de la récupération du projet :", error);
      }
    };

    if (projectId) {
      fetchProject();
    }
  }, [projectId, url_backend]);

  // Utilisez les valeurs du projet pour initialiser les états
  useEffect(() => {
    if (edit) {
      setTitle(project.title);
      setIntroductoryDescription(project.introductoryDescription);
      setThumbnailImage(project.thumbnailImage);
      setCompleteDescription(project.completeDescription);
      setKeywords(project.keywords.join(" "));
    }
  }, [edit, project]);

  const handleKeywordsChange = (e) => {
    const keywordsArray = e.target.value.split(",");
    setKeywords(keywordsArray);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Créer un tableau contenant toutes les images non vides
    const imagesArray = [image1, image2, image3, image4, image5].filter(
      (image) => image !== ""
    );

    // Créer le corps de la requête en incluant le tableau d'images
    const requestBody = {
      projectId,
      title,
      introductoryDescription,
      completeDescription,
      keywords,
      thumbnailImage,
      illustrationImages: imagesArray,
    };

    try {
      const token = localStorage.getItem("token");
      const url_backend = localStorage.getItem("url_backend");
      const endpoint = edit ? `/api/projects/${project._id}` : "/api/projects";
      const response = await axios({
        method: edit ? "put" : "post",
        url: `${url_backend}${endpoint}`,
        data: requestBody,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log(response.data);

      // Réinitialise le formulaire après la soumission réussie
      setTitle("");
      setIntroductoryDescription("");
      setCompleteDescription("");
      setThumbnailImage("");
      setKeywords([]);
      setImage1("");
      setImage2("");
      setImage3("");
      setImage4("");
      setImage5("");

      window.location.href = "/dashboard";
    } catch (error) {
      console.error(
        "Erreur lors de la création ou de la mise à jour du projet :",
        error
      );
    }
  };

  return (
    <Container>
      <Box
        component="form"
        onSubmit={handleSubmit}
        style={{ marginTop: "70px" }}
      >
        <TextField
          fullWidth
          margin="normal"
          label="Title *"
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          InputProps={{ style: { color: "white" } }}
          InputLabelProps={{ style: { color: "white" } }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Introductory Description *"
          multiline
          rows={4}
          value={introductoryDescription}
          onChange={(e) => setIntroductoryDescription(e.target.value)}
          InputProps={{ style: { color: "white" } }}
          InputLabelProps={{ style: { color: "white" } }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Complete Description *"
          multiline
          rows={8}
          value={completeDescription}
          onChange={(e) => setCompleteDescription(e.target.value)}
          InputProps={{ style: { color: "white" } }}
          InputLabelProps={{ style: { color: "white" } }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Keywords *"
          type="text"
          name="keywords"
          helperText="Séparer les mots-clés par des virgules"
          className="helper-text-white"
          value={Array.isArray(keywords) ? keywords.join(",") : keywords}
          onChange={handleKeywordsChange}
          InputProps={{ style: { color: "white" } }}
          InputLabelProps={{ style: { color: "white" } }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Thumbnail Image *"
          type="text"
          value={thumbnailImage}
          onChange={(e) => setThumbnailImage(e.target.value)}
          InputProps={{ style: { color: "white" } }}
          InputLabelProps={{ style: { color: "white" } }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Image d'illustration 1 *"
          type="text"
          value={image1}
          onChange={(e) => setImage1(e.target.value)}
          InputProps={{ style: { color: "white" } }}
          InputLabelProps={{ style: { color: "white" } }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Image d'illustration 2"
          type="text"
          value={image2}
          onChange={(e) => setImage2(e.target.value)}
          InputProps={{ style: { color: "white" } }}
          InputLabelProps={{ style: { color: "white" } }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Image d'illustration 3"
          type="text"
          value={image3}
          onChange={(e) => setImage3(e.target.value)}
          InputProps={{ style: { color: "white" } }}
          InputLabelProps={{ style: { color: "white" } }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Image d'illustration 4"
          type="text"
          value={image4}
          onChange={(e) => setImage4(e.target.value)}
          InputProps={{ style: { color: "white" } }}
          InputLabelProps={{ style: { color: "white" } }}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Image d'illustration 5"
          type="text"
          value={image5}
          onChange={(e) => setImage5(e.target.value)}
          InputProps={{ style: { color: "white" } }}
          InputLabelProps={{ style: { color: "white" } }}
        />
        <Button type="submit" variant="contained" color="primary">
          {edit ? "Mettre à jour le projet" : "Créer le projet"}
        </Button>
      </Box>
    </Container>
  );
}
