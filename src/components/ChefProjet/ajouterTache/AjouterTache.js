import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './ajoutertache.css';
import { FaArrowLeft } from 'react-icons/fa';

const AjouterTache = ({ projetId, onTacheCree, onCancel }) => {
    const [nom, setNom] = useState('');
    const [description, setDescription] = useState('');
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [priorite, setPriorite] = useState('');
    const [statut, setStatut] = useState('');
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [responsableId, setResponsableId] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8090/api/projects/${projetId}/membres`, {
            auth: {
                username: 'user',
                password: '7f59a8d0-1b1f-46db-a854-a76b81d67fdf'
            }
        })
        .then(response => {
            // Trier les utilisateurs par nom
            const utilisateursTries = response.data.sort((a, b) => {
                return a.nom.localeCompare(b.nom);
            });
            setUtilisateurs(utilisateursTries);
            console.log("Utilisateurs récupérés : ", utilisateursTries);
        })
        .catch(error => console.error('Erreur lors de la récupération des utilisateurs:', error));
    }, []);

    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const nouvelleTache = {
            nom,
            description,
            dateDebut,
            dateFin,
            priorite,
            statut,
            responsable: { id: parseInt(responsableId)  }, //je dois le replacer par la suite
            projet: { id: projetId } 
        };

        axios.post('http://localhost:8090/api/taches', nouvelleTache,{
                auth: {
                    username: 'user',
                    password: '7f59a8d0-1b1f-46db-a854-a76b81d67fdf'
                }
            }).then(response=>{
                const tacheCree = response.data;
                tacheCree.dateDebut = formatDate(tacheCree.dateDebut);
                tacheCree.dateFin = formatDate(tacheCree.dateFin);
                onTacheCree(response.data); 
                onCancel(); 
            }).catch(error => {
                console.error('Erreur lors de l\'ajout de la tache:', error);
                if (error.response) {
                    console.error('Détails de l\'erreur:', error.response.data);
                }
            });
          
    };
    const formatDate = (dateString) => {
        return dateString.split('T')[0]; 
    };
    const handleMembreChange = (e) => {
        setResponsableId(e.target.value); 
    };
    
    const isFormValid = () => {
        return nom && priorite&&dateDebut && dateFin && statut && new Date(dateDebut) <= new Date(dateFin);
    };
    return (
        <div className="modal-overlay show">
            <div className="modal show">
                <div className="modal-content">
                    <div className="modal-header">
                        <span className="back-icon" onClick={onCancel}>
                            <FaArrowLeft />
                        </span>
                        <h2 className="modal-title">Ajouter une Tâche</h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input 
                            type="text" 
                            placeholder="Nom de la tache *"
                            value={nom} 
                            onChange={(e) => setNom(e.target.value)} 
                            required />
                        </div>
                        <div className="form-group">
                            <textarea value={description} 
                            placeholder="Description (optionnelle)"
                            onChange={(e) => setDescription(e.target.value)} ></textarea>
                        </div>
                        <div className="form-group">
                            <input type="date" value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <input type="date" value={dateFin} onChange={(e) => setDateFin(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <input type="text" 
                            placeholder='Priotité (0-1-2)'
                            value={priorite} onChange={(e) => setPriorite(e.target.value)} 
                            required/>
                        </div>
                        <select 
                        value={statut} 
                        onChange={(e) => setStatut(e.target.value)} 
                        required
                    >
                        <option value="" disabled>Statut *</option>
                        <option value="NON_COMMENCEE">NON COMMENCEE</option>
                        <option value="EN_COURS">EN COURS</option>
                        <option value="TERMINEE">TERMINEE</option>
                    </select>
                        <div className="multi-select">
                        {utilisateurs.length === 0 ? (
                            <p>Aucun membre n'est associé à ce projet.</p>
                        ) : (
                            <select
                                value={responsableId}
                                onChange={(e) => setResponsableId(e.target.value)} 
                                required
                            >
                                <option value="" disabled>-- Sélectionner un responsable --</option>
                                {utilisateurs.map((utilisateur) => (
                                    <option key={utilisateur.id} value={utilisateur.id}>
                                        {utilisateur.nom} {utilisateur.prenom}
                                    </option>
                                ))}
                            </select>

                        )}

                    </div>
                        <div className="button-group">
                            <button type="submit" className="btn-save" disabled={!isFormValid()}>Enregistrer</button>
                            
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AjouterTache;
