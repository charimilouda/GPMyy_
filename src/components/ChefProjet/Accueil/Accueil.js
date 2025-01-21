import React, { useEffect, useState } from 'react';
import { FaHome, FaProjectDiagram, FaUserCircle, FaPlus } from 'react-icons/fa';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import axios from 'axios';
import AjouterProjet from '../ajouterProjet/AjouterProjet.js';
import DetailsProject from '../detailsProjet/DetailsProject.js';
import './accueil.css';

const Accueil = ({ nomUtilisateur }) => {
    const dateDuJour = format(new Date(), 'EEEE dd MMMM', { locale: fr });
    
    const [projets, setProjets] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProject, setSelectedProject] = useState(null); // État pour le projet sélectionné

    useEffect(() => {
        axios.get('http://localhost:8090/api/projects/chefDeProjet/1')
            .then(response => {
                setProjets(response.data);
                setFilteredProjects(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des projets:', error);
            });
    }, []);
    

    const handleProjetCree = (nouveauProjet) => {
        const updatedProjets = [...projets, nouveauProjet];
        setProjets(updatedProjets);
        setFilteredProjects(updatedProjets.filter(projet => 
            projet.nom.toLowerCase().includes(searchTerm.toLowerCase())
        ));
        setShowForm(false);
    };
    
    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        const filtered = projets.filter(projet => 
            projet.nom.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredProjects(filtered);
    };

    const handleProjectClick = (projet) => {
        setSelectedProject(projet); // Définit le projet sélectionné
    };

    const handleCloseDetails = () => {
        setSelectedProject(null); // Réinitialisat°  projet sélectionné
    };

    const handleDeleteProject = (id) => {
        setProjets((prevProjets) => prevProjets.filter((projet) => projet.id !== id));
        setFilteredProjects((prevFilteredProjects) => prevFilteredProjects.filter((projet) => projet.id !== id));
    };
    
    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <FaHome size={24} className="icon" />
                <FaProjectDiagram size={24} className="icon" />
            </aside>

            <div className="main-content">
                <header className="header-bar">
                    <div className="logo1">GP<span className="logo2">M</span><span className="logo3">yy</span></div>
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Rechercher un projet..."
                            className="search-bar"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <FaUserCircle size={30} className="profile-icon" />
                </header>

                <div className="content-area">
                    {selectedProject ? (
                        <DetailsProject project={selectedProject} 
                        onClose={handleCloseDetails} 
                        onDelete={handleDeleteProject} 
                        />
                    ) : (
                        <>
                            <div className="date-and-welcome">
                                <p>{dateDuJour}</p>
                                <h1>Salut, {nomUtilisateur} !</h1>
                            </div>

                            <section className="projects-section">
                                <div className="projects-header">
                                    <h2>Mes Projets</h2>
                                    <FaPlus size={20} className="add-icon" onClick={() => setShowForm(true)} />
                                </div>

                                <div className="projects-list">
                                    {filteredProjects.map((projet) => (
                                        <div
                                            key={projet.id}
                                            className="project-card"
                                            onClick={() => handleProjectClick(projet)}
                                        >
                                            <h3>{projet.nom}</h3>
                                            <p><span className='status-style'>{projet.statut}</span></p>
                                            <p><span className='info-style'>Dates :</span> {projet.dateDebut} <br></br> {projet.dateFin}</p>
                                            <p><span className='info-style'>Chef de Projet :</span> {projet.chefDeProjet.nom} {projet.chefDeProjet.prenom}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {showForm && (
                                <AjouterProjet 
                                    onProjetCree={handleProjetCree}
                                    onCancel={() => setShowForm(false)}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Accueil;