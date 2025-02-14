import { useState, useEffect } from "react" 
import { takeAllCategories, saveOneCategory, deleteCategory } from "../../../api/category" 

import { Link } from "react-router-dom" 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faTrashCan } from '@fortawesome/free-regular-svg-icons' 
import { faPen } from '@fortawesome/free-solid-svg-icons' 

const AddCategories = (props) => {

    const [name, setName] = useState("") 
    const [categories, setCategories] = useState([]) 
    const [error, setError] = useState(null) 
    const [successMessage, setSuccessMessage] = useState(null) 

    //------AJOUT GENRE ------//
    const addCategory = (datas) => {
        saveOneCategory(datas)
            .then((res) => {
                if (res.status === 200) {
                    setSuccessMessage("Genre ajouté avec succès !") 
                    setError(null) 

                    // On vide le formulaire après succès
                    setName("") 
                    // On recharge la liste des genres
                    loadCatList() 
                } else {
                    setError("Erreur lors de l'enregistrement du genre.")
                }
            })
            .catch(err=> console.log(err))
    }
    //Au click du formulaire
    const onSubmitFormSaveCat = (e) => {
        e.preventDefault() 
        setError(null) 
        setSuccessMessage(null) 

        const datas = { name } 
        if (name === "") {
            setError("Veuillez remplir les champs vides.") 
        } else {
            addCategory(datas) 
        }
    } 

    //------SUPPRESSION D UN GENRE ------//
    const handleDeleteCat = (categorId) => {
        deleteCategory(categorId)
            .then((res) => {
                if (res.status === 200) {
                    // Mise à jour de la liste des auteurs après la suppression
                    // Rechargement de la liste des genres
                    loadCatList()
                    setSuccessMessage("Genre supprimé avec succès !") 
                } else {
                    setError("Erreur lors de la suppression du genre.") 
                }
            })
            .catch(err=> console.log(err))
    } 

    //------CHARGEMENT DE TOUS LES GENRES ------//
    const loadCatList = () => {
        takeAllCategories()
            .then((res) => {
                if (res.status === 200) {
                    setCategories(res.result) 
                   // console.log("categories",res.result)
                }
            })
            .catch((err) => console.log(err)) 
    } 

    useEffect(() => {
        loadCatList() 
    }, []) 


    return (
        <section id="add-category">
            <article>
            <p><Link to="/admin">Retour</Link></p>
                <h2>Ajout d'un genre dans la base de données</h2>
                {/* Affichage des erreurs ou des messages de succès */}
                {error !== null && <p className="error">{error}</p>}
                {successMessage && <p className="success">{successMessage}</p>}

                <form onSubmit={onSubmitFormSaveCat}>

                    <input
                        type="text"
                        placeholder="Genre"
                        value={name}
                        onChange={(e) => setName(e.currentTarget.value)}
                    />
                    <input type="submit" value="Enregistrer" />
                </form>
            </article>
            <article>
                <h2>Listes des genres</h2>
                {/* Affichage des erreurs ou des messages de succès */}
                {error !== null && <p className="error">{error}</p>}
                {successMessage && <p className="success">{successMessage}</p>}
                <table>
                    <thead>
                        <tr>
                            <th>Genre</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length > 0 ? (
                            categories.map((c) => (
                                <tr key={c.id}>
                                    <td>{c.name}</td>
                                    <td>
                                        <Link to={`/admin/editcat/${c.id}`}>
                                            <FontAwesomeIcon icon={faPen} />
                                        </Link>
                                        <button onClick={() => handleDeleteCat(c.id)}>
                                            <FontAwesomeIcon icon={faTrashCan} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">Aucun genre disponible</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </article>
        </section>
    )
}

export default AddCategories