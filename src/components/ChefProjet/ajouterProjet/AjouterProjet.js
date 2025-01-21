import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ajouterProjet.css';
import { FaArrowLeft } from 'react-icons/fa';

const AjouterProjet = ({ onProjetCree, onCancel }) => {
    const [nom, setNom] = useState('');
    const [description, setDescription] = useState('');
    const [statut, setStatut] = useState('');
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [membresSelectionnes, setMembresSelectionnes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8090/api/users', {
            auth: {
                username: 'user',
                password: '7f59a8d0-1b1f-46db-a854-a76b81d67fdf'
            }
        })
        .then(response => {
            const utilisateursTries = response.data.sort((a, b) => {
                return a.nom.localeCompare(b.nom);
            });
            setUtilisateurs(utilisateursTries);
            console.log("Utilisateurs récupérés : ", utilisateursTries);
        })
        .catch(error => console.error('Erreur lors de la récupération des utilisateurs:', error));
    }, []);

    const handleMembreChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map(option => parseInt(option.value));
        setMembresSelectionnes(selectedOptions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const nouveauProjet = {
            nom,
            description,
            dateDebut,
            dateFin,
            statut,
            chefDeProjet: { id: 1 }, 
            membresEquipe: membresSelectionnes.map(id => ({ id }))
        };
        
        axios.post('http://localhost:8090/api/projects', nouveauProjet, {
            auth: {
                username: 'user',
                password: '7f59a8d0-1b1f-46db-a854-a76b81d67fdf'
            }
        })
        .then(response => {
            const projetCree = response.data;
            projetCree.dateDebut = formatDate(projetCree.dateDebut);
            projetCree.dateFin = formatDate(projetCree.dateFin);

            onProjetCree(response.data);
            setNom('');
            setDescription('');
            setStatut('');
            setDateDebut('');
            setDateFin('');
            setMembresSelectionnes([]);
        })
        .catch(error => {
            console.error('Erreur lors de l\'ajout du projet:', error);
            if (error.response) {
                console.error('Détails de l\'erreur:', error.response.data);
            }
        });
    };
    
    const isFormValid = () => {
        return nom && dateDebut && dateFin && statut;
    };
    const formatDate = (dateString) => {
        return dateString.split('T')[0]; 
    };
    

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <FaArrowLeft className="back-icon" onClick={onCancel} />
                    <h2 className="modal-title">Créer un nouveau projet</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nom du projet *"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Description (optionnelle)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                        type="date"
                        value={dateDebut}
                        onChange={(e) => setDateDebut(e.target.value)}
                        required
                    />
                    <input
                        type="date"
                        value={dateFin}
                        onChange={(e) => setDateFin(e.target.value)}
                        required
                    />
                    <select 
                        value={statut} 
                        onChange={(e) => setStatut(e.target.value)} 
                        required
                    >
                        <option value="" disabled>Statut *</option>
                        <option value="EN_ATTENTE">EN ATTENTE</option>
                        <option value="EN_COURS">EN COURS</option>
                        <option value="TERMINE">TERMINE</option>
                    </select>

                    <div className="multi-select">
                        <label>Choisir des membres :</label>
                        <select 
                            multiple 
                            value={membresSelectionnes} 
                            onChange={handleMembreChange} 
                            style={{ height: '100px', width: '100%' }} 
                        >
                            {utilisateurs.map((utilisateur) => (
                                <option key={utilisateur.id} value={utilisateur.id}>
                                    {utilisateur.nom}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" disabled={!isFormValid()}>Créer Projet</button>
                </form>
            </div>
        </div>
    );
};

export default AjouterProjet;