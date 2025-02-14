import { useState, useEffect } from "react"
import { takeAllConditions, saveOneCondition, deleteCondition } from "../../../api/condition"

import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'

const AddConditions = (props) => {

    const [name, setName] = useState("")
    const [conditions, setConditions] = useState([])
    const [error, setError] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    //------AJOUT ETAT ------//
    const addCondition = (datas) => {
        saveOneCondition(datas)
            .then((res) => {
                if (res.status === 200) {
                    setSuccessMessage("Etat ajouté avec succès !")
                    setError(null)
                    // On vide le formulaire après succès
                    setName("")
                    // On recharge la liste des états
                    loadConditionList()
                }
                else {
                    setError("Erreur lors de l'enregistrement de l'état.")
                }
            })
            .catch((err) => console.log(err))
    }
    //Au click du formulaire
    const onSubmitFormSaveCond = (e) => {
        e.preventDefault()
        setError(null)
        setSuccessMessage(null)

        const datas = { name }
        if (name === "") {
            setError("Veuillez remplir les champs vides.")
        }
        else {
            addCondition(datas)
        }
    }

    //------SUPPRESSION D UN GENRE ------//
    const handleDeleteCond = (condId) => {
        deleteCondition(condId)
            .then((res) => {
                if (res.status === 200) {
                    setSuccessMessage("Etat supprimé avec succès !")
                    // Rechargement de la liste des états
                    loadConditionList()
                }
                else {
                    setError("Erreur lors de la suppression de l'état.")
                }
            })
            .catch((err) => console.log(err))
    }
    
    //Mise à jour de la liste des états
    const loadConditionList = () => {
        takeAllConditions()
            .then((res) => {
                if (res.status === 200) {
                    setConditions(res.result)
                    //console.log("Conditions", res.result) 
                }
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        loadConditionList()
    }, [])


    return (
        <section id="add-condition">
            <article>
            <p><Link to="/admin">Retour</Link></p>
                <h2>Ajout d'un état de livre dans la base de données</h2>
                {/* Affichage des erreurs ou des messages de succès */}
                {error !== null && <p className="error">{error}</p>}
                {successMessage && <p className="success">{successMessage}</p>}

                <form onSubmit={onSubmitFormSaveCond}>

                    <input
                        type="text"
                        placeholder="Etat"
                        value={name}
                        onChange={(e) => setName(e.currentTarget.value)}
                    />
                    <input type="submit" value="Enregistrer" />
                </form>
            </article>
            <article>
                <h2>Listes des états</h2>
                {/* Affichage des erreurs ou des messages de succès */}
                {error !== null && <p className="error">{error}</p>}
                {successMessage && <p className="success">{successMessage}</p>}
                <table>
                    <thead>
                        <tr>
                            <th>Etats des livres</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {conditions.length > 0 ? (
                            conditions.map((co) => (
                                <tr key={co.id}>
                                    <td>{co.name}</td>
                                    <td><button onClick={() => handleDeleteCond(co.id)}>
                                        <FontAwesomeIcon icon={faTrashCan} />
                                    </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">Aucun état disponible</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </article>
        </section>
    )
}

export default AddConditions
