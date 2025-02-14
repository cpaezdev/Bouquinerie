import { useState, useEffect } from "react";
import { allAuthors, saveAuthor, deleteAuthor } from "../../../api/author";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const AddAuthors = () => {

    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("")
    const [authors, setAuthors] = useState([])
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null)

    //------AJOUT AUTEUR ------//
    const addAut = (datas) => {
        saveAuthor(datas)
            .then((res) => {
                if (res.status === 200) {
                    setSuccessMessage("Auteur ajouté avec succès !");
                    setError(null);
                    
                    // Vider le formulaire après succès
                    setFirstname("");
                    setLastname("");

                    // Recharger la liste des auteurs
                    loadAuthorList();
                } else {
                    setError("Erreur lors de l'enregistrement de l'auteur.");

                }
            })
            .catch((err) => {
                console.log("ERR",err)
                setError("Erreur lors de la communication avec le serveur.");
            });
    };

    
    const onSubmitFormSaveAuth = (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        const datas = { firstname, lastname };
        if (firstname === "" || lastname === "") {
            setError("Veuillez remplir les champs vides.");
        } else {
            addAut(datas);
        }
    };

    //------SUPPRESSION D'UN AUTEUR ------//
    const handleDeleteAuthor = (authorId) => {
        deleteAuthor(authorId)
            .then((res) => {
                if (res.status === 200) {
                    // Mettre à jour la liste des auteurs après la suppression
                    loadAuthorList();
                    setSuccessMessage("Auteur supprimé avec succès.");
                } else {
                    setError("Erreur lors de la suppression de l'auteur.");
                }
            })
            .catch(err=>console.log(err))        
    }

    //------CHARGEMENT DE TOUS LES AUTEURS ------//
    const loadAuthorList = () => {
        allAuthors()
            .then((res) => {
                if (res.status === 200) {
                    setAuthors(res.result);
                }
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        loadAuthorList();
    }, []);

    return (
        <section id="add-authors">
            <article>
            <p><Link to="/admin">Retour</Link></p>
                <h2>Ajout d'un auteur dans la base de données</h2>

                {/* Affichage des erreurs ou des messages de succès */}
                {error !== null && <p className="error">{error}</p>}
                {successMessage && <p className="success">{successMessage}</p>}

                <form onSubmit={onSubmitFormSaveAuth}>
                    <input
                        type="text"
                        placeholder="Prénom"
                        value={firstname}
                        onChange={(e) => setFirstname(e.currentTarget.value)}
                    />
                    <input
                        type="text"
                        placeholder="Nom"
                        value={lastname}
                        onChange={(e) => setLastname(e.currentTarget.value)}
                    />
                    <input type="submit" value="Enregistrer" />
                </form>
            </article>

            <article>
                <h2>Listes des auteurs</h2>
                {/* Affichage des erreurs ou des messages de succès */}
                {error !== null && <p className="error">{error}</p>}
                {successMessage && <p className="success">{successMessage}</p>}
                <table>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {authors.length > 0 ? (
                            authors.map((a) => (
                                <tr key={a.id}>
                                    <td>{a.lastname}</td>
                                    <td>{a.firstname}</td>
                                    <td>
                                        <Link to={`/admin/editauthor/${a.id}`}>
                                            <FontAwesomeIcon icon={faPen} />
                                        </Link>
                                        <button onClick={() => handleDeleteAuthor(a.id)}>
                                            <FontAwesomeIcon icon={faTrashCan} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">Aucun auteur disponible</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </article>
        </section>
    );
};

export default AddAuthors;
