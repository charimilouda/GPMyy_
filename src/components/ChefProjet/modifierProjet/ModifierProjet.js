import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../ajouterProjet/ajouterProjet.css';
import { FaArrowLeft } from 'react-icons/fa';

const ModifierProjet = ({ project, onProjectUpdated, onCancel }) => {
  const [nom, setNom] = useState(project.nom || '');
  const [description, setDescription] = useState(project.description || '');
  const [statut, setStatut] = useState(project.statut || '');
  const [dateDebut, setDateDebut] = useState(project.dateDebut || '');
  const [dateFin, setDateFin] = useState(project.dateFin || '');
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [membresSelectionnes, setMembresSelectionnes] = useState(
    project.membresEquipe?.map((membre) => membre.id) || []
  );
  const [errorMessage, setErrorMessage] = useState('');  // Ajout d'un état pour gérer les erreurs

  useEffect(() => {
    axios
      .get('http://localhost:8090/api/users', {
        auth: {
          username: 'user',  //  je dois les remplacer par la suite (need security)
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
    const selectedOptions = Array.from(e.target.selectedOptions).map((option) =>
      parseInt(option.value)
    );
    setMembresSelectionnes(selectedOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const projetMisAJour = {
        nom,
        description,
        dateDebut,
        dateFin,
        statut,
        chefDeProjet: { id: 1 },  
        membresEquipe: membresSelectionnes.map(id => ({ id }))
    };
    axios.put(`http://localhost:8090/api/projects/${project.id}`, projetMisAJour, {
        auth: {
            username: 'user',
            password: '7f59a8d0-1b1f-46db-a854-a76b81d67fdf'
        }
    })
    .then(response => {
      onProjectUpdated(response.data); 
      onCancel(); 
    })
    .catch(error => {
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
          <h2 className="modal-title">Modifier le projet</h2>
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
          <select value={statut} onChange={(e) => setStatut(e.target.value)} required>
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

          {errorMessage && <div className="error-message">{errorMessage}</div>}  {/* Affichage des erreurs */}

          <button type="submit" disabled={!isFormValid()}>Enregistrer les modifications</button>
        </form>
      </div>
    </div>
  );
};

export default ModifierProjet;
