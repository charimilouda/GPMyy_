import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import './commentsModal.css';
import { Description } from '@mui/icons-material';

const CommentsModal = ({ taskId, onCommentCree,onCancel }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [contenu, setContenu] = useState('');
    const [dateCreation, setDateCreation] = useState('');



    useEffect(() => {
        // Fetch comments for the specific task
        const fetchComments = async () => {
            try {
                console.log("Récupération des comments :");
                const response = await axios.get(`http://localhost:8090/api/commentaires/tache/${taskId}`);
                setComments(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des commentaires :", error);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [taskId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nouveauCommentaire={
            contenu, 
            dateCreation,
            auteur:{id:1},//id de chef de projet
            tache:{id:taskId},
        }
         axios.post(`http://localhost:8090/api/commentaires`,nouveauCommentaire ,{
                auth: {
                    username: 'user',
                    password: '7f59a8d0-1b1f-46db-a854-a76b81d67fdf'
                }
            }).then(
                response=>{
                    const commentCree=response.data;
                    //formater la date de création
                    commentCree.dateCreation=formatDate(commentCree.dateCreation);
                    onCommentCree(response.data);
                    onCancel();//fermer le formulaire
            }).catch(error => {
                console.error('Erreur lors de l\'ajout du commentaire:', error);
                if (error.response) {
                    console.error('Détails de l\'erreur:', error.response.data);
                }
            });
    };
    const formatDate = (dateString) => {
        return dateString.split('T')[0]; // Supprimez l'heure pour ne garder que la date
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
            <FaArrowLeft className="back-icon" onClick={onCancel} />
            <h2 className="modal-title">Commentaires </h2>
            </div>
               
                {loading ? (
                    <p>Chargement des commentaires...</p>
                ) : (
                    <>
                        <ul className="comments-list">
                            {comments.map((comment) => (
                                <div key={comment.id} className="comment">
                            <p><strong>{comment.auteur}:</strong> {comment.texte}</p>
                        </div>
                            ))}
                        </ul>
                        <form onSubmit={handleSubmit}>
                            <div className="add-comment">
                                <textarea
                                    value={contenu}
                                    onChange={(e) => setContenu(e.target.value)}
                                    placeholder="Ajouter un commentaire..."
                                />
                                <button type='submit'>Envoyer</button>
                            </div>
                        </form>
                        
                    </>
                )}
            </div>
        </div>
    );
};

export default CommentsModal;
