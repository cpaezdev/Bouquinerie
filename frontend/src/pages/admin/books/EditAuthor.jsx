import { useState, useEffect } from "react" 
import { allAuthors, oneAuthor, updateAuthor } from "../../../api/author" 

import { Link, Navigate } from "react-router-dom" 

const EditAuthor = (props) => {

    const [firstname, setFirstname] = useState("") 
    const [lastname, setLastname] = useState("") 
    const [error, setError] = useState(null) 
    const [redirect, setRedirect] = useState(false)  // 

    //------MODIFICATION D'UN AUTEUR ------//
    const uppAuth = (datas) => {
        updateAuthor(datas, props.params.id)
            .then((res) => {
                if (res.status === 200) {
                    setError(null)

                    // Rechargement de la liste des auteurs
                    allAuthors()
                        .then((response) => {
                            if (response.status === 200) { 
                                setRedirect(true)  // On redirige après la modification réussie
                            }
                        })
                        .catch((err) => console.log(err)) 
                } else {
                    setError("Erreur lors de la modification de l'auteur.") 
                }
            })
            .catch((err) => console.log(err))
    } 

    // Gestionnaire de soumission du formulaire pour la modification d'un auteur
    const onSubmitFormUpAuth = (e) => {
        e.preventDefault() 
        setError(null) 

        const datas = { firstname, lastname } 
        if (firstname === "" || lastname === "") {
            setError("Veuillez remplir les champs vides.") 
        } else {
            uppAuth(datas) 
        }
    } 

    // Récupération de l'auteur spécifique lors du chargement du composant
    useEffect(() => {
        
        oneAuthor(props.params.id)
            .then((res) => {
                if (res.status === 200) {
                setFirstname(res.result.firstname) 
                setLastname(res.result.lastname) 
                }
            })
             .catch((err) => console.log(err))
    }, []) 

    // Redirection vers la liste des auteurs une fois la modification réussie
    if (redirect) {
        return <Navigate to="/admin/addauthors" /> 
    }

    return (
        <section id="edit-authors">
            <p><Link to="/admin/addauthors">Retour à la liste des auteurs</Link></p>
            <h2>Modification d'un auteur</h2>

            {/* Affichage des erreurs ou des messages de succès */}
            {error !== null && <p className="error">{error}</p>}

            <form onSubmit={onSubmitFormUpAuth}>
                <input
                    type="text"
                    defaultValue={firstname}
                    onChange={(e) => setFirstname(e.currentTarget.value)}
                />
                <input
                    type="text"
                    defaultValue={lastname} 
                    onChange={(e) => setLastname(e.currentTarget.value)}
                />
                <input type="submit" value="Modifier" />
            </form>
        </section>
    ) 
} 

export default EditAuthor 
