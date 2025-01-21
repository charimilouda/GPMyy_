import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaTimes, FaPlus,FaComments } from 'react-icons/fa';
import './DetailsProject.css';
import ModifierProjet from '../modifierProjet/ModifierProjet';
import AjouterTache from '../ajouterTache/AjouterTache';
import ModifierTache from '../modifierTache/ModifierTache';
import CommentsModal from '../Commentaires/CommentsModal';

const DetailsProject = ({ project, onClose, onDelete, onProjectUpdated }) => {
    const [taches, setTaches] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false);
    const [projectState, setProjectState] = useState(project);
    const [showAddTaskForm, setShowAddTaskForm] = useState(false);
    const [isLoading, setIsLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const [taskToEdit, setTaskToEdit] = useState(null); 
    const [showEditTaskForm, setShowEditTaskForm] = useState(false);
    const [selectedTaskForComments, setSelectedTaskForComments] = useState(null);
    const [showCommentForm, setShowCommentForm]=useState(false);

    // Fonction pour récupérer les tâches du projet
    useEffect(() => {
        const fetchTaches = async () => {
            try {
                const response = await axios.get(`http://localhost:8090/api/taches/projet/${project.id}`);
                setTaches(response.data);
            } catch (error) {
                setError('Erreur lors de la récupération des tâches');
            } finally {
                setIsLoading(false); 
            }
        };

        fetchTaches();
    }, [project.id]);
    // Fonction pour gérer l'ajout d'une tâche
    const handleAddTask = async (nouvelleTache) => {
        try {
            const response = await axios.post('http://localhost:8090/api/taches', nouvelleTache);
            setTaches([...taches, response.data]);
            setShowAddTaskForm(false);  // Fermer le formulaire après ajout
        } catch (error) {
            console.error("Erreur lors de l'ajout de la tâche:", error);
        }
    };
    const handleDelete = async () => {
        const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce projet ?");
        if (confirmed) {
            try {
                await axios.delete(`http://localhost:8090/api/projects/${project.id}`);
                onDelete(project.id);
                onClose(); // Fermer les détails du proj
            } catch (error) {
                console.error("Erreur lors de la suppression du projet :", error);
            }
        }
    };

    // Fonction pour gérer la modification du projet
    const handleEditClick = () => {
        setShowEditForm(true); // Afficher le formulaire  modif
    };

    const handleProjectUpdate = (updatedProject) => {
        setShowEditForm(false); // masquage du formulaire demodif
        setProjectState(updatedProject); 
        onProjectUpdated(updatedProject); // Notifier le parent des modifications
    };

    // Fonction pour gérer la suppression d'une tâche
    const handleDeleteTask = async (taskId) => {
        const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?");
        if (confirmed) {
            try {
                await axios.delete(`http://localhost:8090/api/taches/${taskId}`,
                {
                    auth: {
                        username: 'user',  
                        password: '7f59a8d0-1b1f-46db-a854-a76b81d67fdf'
                      }
                }
                );
                setTaches(taches.filter((tache) => tache.id !== taskId));
            } catch (error) {
                console.error("Erreur lors de la suppression de la tâche :", error);
            }
        }
    };

    // Fonction pour gérer l'édition d'une tâche
    const handleEditTask = (task) => {
        console.log("Modification de la tâche :", task);
        setTaskToEdit(task); // Définit la tâche en cours d'édition
        setShowEditTaskForm(true);

    };

    // Fonction pour gérer la mise à jour d'une tâche
    const handleTaskUpdated = (updatedTask) => {
        // Met à jour la liste des tâches avec les nouvelles données
        setTaches((prevTasks) =>
            prevTasks.map(
                (task) =>(task.id === updatedTask.id ? updatedTask : task)
                
            )
        );
        console.log("Tâche mise à jour:", updatedTask);
        setShowEditTaskForm(false); // Ferme le formulaire
    };
    

    // Gestion de la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 6; // Nombre de tâches par page

  // Calcul des tâches visibles
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = taches.slice(indexOfFirstTask, indexOfLastTask);

  // Changement de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);




  /*const handleCommentsClick = async(taskId) => 
    {
        try {
            console.log("commmmmeeennnntaaiiiires");
            const response = await axios.get(`http://localhost:8090/api/commentaires/tache/${taskId}`);
            setSelectedTaskForComments(response.data); // Stocker les commentaires de la tâche
            setShowCommentForm(true);
        } catch (error) {
            console.error("Erreur lors de la récupération des commentaires:", error);
        }
        
    };*/

    //fonction pour l'ajout de commentaire 
    /*const handleAddCommentaire =async(nouveauCommentaire)=>{
        try{
            const response=await axios.post('http://localhost:8090/api/commentaires', nouveauCommentaire);
            setShowCommentForm(false);
        }catch(error){
            console.error("Erreur lors de l'ajout du commentaire:", error);
        }
    }*/

    return (
        <div className="details-project">
            {showEditForm ? (
                <ModifierProjet
                    project={projectState} 
                    onProjectUpdated={handleProjectUpdate}
                    onCancel={() => setShowEditForm(false)}
                />
            ) : (
                <>
                    <div className="project-header">
                        <h2 className="project-title">Détails du Projet</h2>
                        <div className="button-group">
                            <button className="icon-button modify-button" onClick={handleEditClick}>
                                <FaEdit />
                            </button>
                            <button className="icon-button delete-button" onClick={handleDelete}>
                                <FaTrash />
                            </button>
                            <button className="icon-button close-button" onClick={onClose}>
                                <FaTimes />
                            </button>
                        </div>
                    </div>

                    <div className="project-details">
                        <h3>{projectState.nom}</h3>
                        <p><strong>Statut:</strong> {projectState.statut}</p>
                        <p><strong>Description :</strong> {projectState.description}</p>
                        <p ><strong>Dates:</strong> {projectState.dateDebut} - {projectState.dateFin}</p>
                        <p><strong>Chef de Projet:</strong> {projectState.chefDeProjet.nom} {projectState.chefDeProjet.prenom}</p>
                        
                    </div>

                    <div className="project-tasks">
                        
                    <div className="tasks-header">
                        <h3>Tâches du Projet</h3>
                        <FaPlus size={20} className="add-icon" onClick={() => setShowAddTaskForm(true)} />
                    </div>
                        {isLoading ? (
                            <p>Chargement des tâches...</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : (
                            <div className="tasks-table-container">
                                    <table className="tasks-table">
                                        <thead>
                                            <tr>
                                                <th>Nom</th>
                                                <th>Description</th>
                                                <th>Date Début</th>
                                                <th>Date Fin</th>
                                                <th>Priorité</th>
                                                <th>Statut</th>
                                                <th>Responsable</th>
                                                <th>Actions</th>
                                                <th>comentaires</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentTasks.map((tache) => (
                                                <tr key={tache.id} className={`priority-${tache.priorite.toLowerCase()}`}>
                                                    <td>{tache.nom}</td>
                                                    <td>{tache.description}</td>
                                                    <td>{tache.dateDebut}</td>
                                                    <td>{tache.dateFin}</td>
                                                    <td>{tache.priorite}</td>
                                                    <td>{tache.statut}</td>
                                                    <td>
                                                        {tache.responsable ? `${tache.responsable.nom} ${tache.responsable.prenom}` : "Aucun responsable"}
                                                    </td>
                                                    <td id="icons-action">
                                                        <FaEdit
                                                            className="icon-action edit-icon"
                                                            title="Modifier la tâche"
                                                            onClick={() => handleEditTask(tache)}
                                                        />
                                                        <FaTrash
                                                            className="icon-action delete-icon"
                                                            title="Supprimer la tâche"
                                                            onClick={() => handleDeleteTask(tache.id)}
                                                        />
                                                    </td>
                                                    <td id="comment-action-td">
                                                        <FaComments 
                                                            className="comment-action comment-icon"
                                                            /*onClick={() => handleCommentsClick(tache.id)}*/
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                

                             {/* Pagination */}
                             <div className='pagination-container'>

                             {taches.length > tasksPerPage && (
    <div className="pagination">
        {[...Array(Math.ceil(taches.length / tasksPerPage)).keys()].map((number) => (
            <button
                key={number + 1}
                onClick={() => paginate(number + 1)}
                className={currentPage === number + 1 ? "active-page" : ""}
            >
                {number + 1}
            </button>
        ))}
    </div>
)}

        </div>
                            </div>
                        )}
                    </div>

                    {showAddTaskForm && (
                        <AjouterTache
                            projetId={project.id}
                            onTacheCree={handleAddTask}  
                            onCancel={() => setShowAddTaskForm(false)} 
                        />
                    )}
                    {showEditTaskForm && taskToEdit && (
                        <ModifierTache
                            task={taskToEdit}
                            onTaskUpdated={handleTaskUpdated} 
                            onCancel={() => setShowEditTaskForm(false)}  
                        />
                    )}
                    
                    {/*showCommentForm&& selectedTaskForComments && (
                        <CommentsModal
                            taskId={selectedTaskForComments}
                            onCommentCree={handleAddCommentaire}
                            onCancel={() => setShowCommentForm(false)}
                        />
                    )*/}


                </>
            )}
        </div>
    );
};

export default DetailsProject;
