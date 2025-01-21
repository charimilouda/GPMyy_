import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import '../modifierTache/modifierTache.css';
const ModifierTache = ({ task, onTaskUpdated, onCancel }) => {
    const mapPrioriteToText = {
        0: 'FAIBLE',
        1: 'MOYENNE',
        2: 'HAUTE'
    };
    
    const mapTextToPriorite = {
        'FAIBLE': 0,
        'MOYENNE': 1,
        'HAUTE': 2
    };
    const [nom, setNom] = useState(task.nom || '');
    const [description, setDescription] = useState(task.description || '');
    const [priorite, setPriorite] = useState(mapTextToPriorite[task.priorite] || 0);
    const [statut, setStatut] = useState(task.statut || '');
    const [dateDebut, setDateDebut] = useState(task.dateDebut || '');
    const [dateFin, setDateFin] = useState(task.dateFin || '');
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [responsableId, setResponsableId] = useState('');

    const [errorMessage, setErrorMessage] = useState('');  
    
    
    //const [updatedTask, setUpdatedTask] = useState(task);
    useEffect(() => {
        axios.get(`http://localhost:8090/api/projects/${task.projet.id}/membres`, {

            auth: {
              username: 'user', 
              password: '7f59a8d0-1b1f-46db-a854-a76b81d67fdf'
            }
          })
          .then((response) => {
            const utilisateursTries = response.data.sort((a, b) =>
              a.nom.localeCompare(b.nom)
            );
            setUtilisateurs(utilisateursTries);
          })
          .catch((error) => {
            console.error('Erreur lors de la récupération des utilisateurs:', error);
            setErrorMessage('Erreur lors de la récupération des utilisateurs'); 
          });
      }, []);
      const handleMembreChange = (e) => {
        setResponsableId(e.target.value); 
    };




  

    const handleSubmit =  (e) => {
        e.preventDefault();
        const tacheMisAJour={
            nom,
            description,
            dateDebut,
            dateFin,
            priorite: mapPrioriteToText[priorite], 
            statut,
            responsable: { id: parseInt(responsableId)  }, 
            projet: { id: task.projet.id } // Association au projet
        };
        axios.put(`http://localhost:8090/api/taches/${task.id}`, tacheMisAJour,{
            auth: {
                username: 'user',
                password: '7f59a8d0-1b1f-46db-a854-a76b81d67fdf'
            }
        }).then(
            response => {
                console.log('Réponse de l\'API après mise à jour:', response.data);
                onTaskUpdated(response.data); // Mettre à jour le projet dans le parent
                onCancel(); 
              }

        ).catch(error => {
            console.error('Erreur lors de la mise à jour du projet:', error);
            if (error.response) {
                console.error('Détails de l\'erreur:', error.response.data);
            }
        });
    };
    const isFormValid = () => {
        return nom && dateDebut && dateFin && statut && new Date(dateDebut) <= new Date(dateFin);
    };
    
    return (
        <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <FaArrowLeft className="back-icon" onClick={onCancel} />
          <h2 className="modal-title">Modifier la tache </h2>
        </div>
        <form onSubmit={handleSubmit}>
                    <label >Nom de la tache : 
                    <input
                        type="text"
                        placeholder='Nom de la tache'
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        required
                    />
                    </label>
                    <label >Description : 
                    <textarea
                        placeholder="Description (optionnelle)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        
                    ></textarea>
                    </label>
                    <label >Date de début : 
                    <input
                        type="date"
                        value={dateDebut}
                        onChange={(e) => setDateDebut(e.target.value)}
                        required
                    />
                    </label>
                    <label >Date de fin : 
                    <input
                        type="date"
                        value={dateFin}
                        onChange={(e) => setDateFin(e.target.value)}
                        required
                    />
                    </label>
                    <label >Priorité : 
                    <select
                        value={priorite}
                        onChange={(e) => setPriorite(Number(e.target.value))}
                        required
                    >
                        <option value="" disabled>Priorité *</option>
                        <option value={0}>0 (Basse)</option>
                        <option value={1}>1 (Moyenne)</option>
                        <option value={2}>2 (Haute)</option>
                    </select>
                    </label>
                    <label >Status : 
                    <select
                        value={statut}
                        onChange={(e) => setStatut(e.target.value)}
                        required
                    >
                        <option value="" disabled>Statut *</option>
                        <option value="EN_COURS">EN COURS</option>
                        <option value="TERMINEE">TERMINEE</option>
                        <option value="NON_COMMENCEE">NON COMMENCEE</option>
                    </select>
                    </label>
                    <label >Responsable : 
                    <div className="multi-select">
                        <select
                        
                        value={responsableId}
                        onChange={(e) => setResponsableId(e.target.value)} 
                        >
                                                            <option value="" disabled>-- Sélectionner un responsable --</option>

                        {utilisateurs.map((utilisateur) => (
                            <option key={utilisateur.id} value={utilisateur.id}>
                            {utilisateur.nom}
                            </option>
                        ))}
                        </select>
                    </div>
                    </label>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}  {/* Affichage des erreurs */}

                <button type="submit" disabled={!isFormValid()}>Enregistrer les modifications</button>
            </form>
        </div>
        </div>
    );
};

export default ModifierTache;
