import { useEffect, useState } from 'react';
import axios from 'axios';

function ProjectsPage() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://localhost:3000/project/'); 
                setProjects(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des projets :', error);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div>
            <h2>Liste des Projets</h2>
            <div className="project-list">
                {projects.map(project => (
                    <div key={project.id}>
                        <h3>{project.title}</h3>
                        <p>{project.introductoryDescription}</p>
                        <p>{project.completeDescription}</p>
                        <p>{project.keywords}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProjectsPage;