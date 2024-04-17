import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Chip, Container, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";

export default function ProjectDetailsPage() {
  const [project, setProject] = useState([]);
  const { projectId } = useParams();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/projects/${projectId}`
        );
        setProject(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des projets :", error);
      }
    };

    fetchProjects();
  }, [projectId]);

  const renderCarousel = () => {
    const carouselStyle = {
      width: "100%", 
    };
    const imageStyle = {
      width: "100%", 
      height: "auto", 
    };

    if (project.illustrationImages && project.illustrationImages.length > 0) {
      return (
        <Carousel style={carouselStyle}>
          {project.illustrationImages.map((imageUrl, index) => (
            <div key={index}>
              <img
                src={imageUrl}
                alt={`Illustration ${index + 1}`}
                style={imageStyle}
              />
            </div>
          ))}
        </Carousel>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <Container
        style={{
          marginTop: "50px",
          display: "flex",
          flexDirection: "column",
          marginBottom: "20px", 
        }}
      >
        <Typography gutterBottom variant="h3" component="div">
          {project.title}
        </Typography>
        <div className="description-projects">
          {project.keywords &&
            project.keywords.map((keyword, index) => (
              <Chip
                key={index}
                label={keyword}
                variant="outlined"
                color="primary"
                style={{ marginRight: "5px", marginBottom: "5px" }}
              />
            ))}
        </div>
        <Typography variant="h4" color="white" style={{ textAlign: "left" }}>
          <div className="description-projects">Introduction</div>
        </Typography>
        <Typography variant="p" color="white">
          <div className="description-projects">
            {project.introductoryDescription}
          </div>
        </Typography>
      </Container>
      {renderCarousel()}
      <Container
        style={{
          marginTop: "50px",
          display: "flex",
          flexDirection: "column",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h4" color="white" style={{ textAlign: "left" }}>
          <div className="description-projects">Description complète</div>
        </Typography>
        <Typography variant="p" color="white">
          <div className="description-projects">
            {project.completeDescription}
          </div>
        </Typography>
      </Container>
    </>
  );
}
