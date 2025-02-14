import { useState, useEffect } from "react" 

import { takeAllCategories, takeOneCategory, updateCategory } from "../../../api/category" 

import { Link, Navigate } from "react-router-dom" 


const EditCategory = (props) => {

    const [name, setName] = useState("") 
    const [error, setError] = useState(null) 
    const [redirect, setRedirect] = useState(false)

    //------MODIFICATION D'UN GENRE------//
    const uppCat = (datas) => {
        updateCategory(datas, props.params.id)
            .then((res) => {
                if (res.status === 200) {
                    setError(null)
                    // Rechargement de la liste des genres
                    takeAllCategories()
                        .then((response) => {
                            if (response.status === 200) {
                                setRedirect(true)  // On redirige après la modification réussie
                            }
                        })
                        .catch((err) => console.log(err)) 
                } else {
                    setError("Erreur lors de la modification du genre.") 
                }
            })
            .catch((err) => console.log(err))
    } 

    // Gestionnaire de soumission de formulaire pour la modification d'un genre
    const onSubmitFormUpCat = (e) => {
        e.preventDefault() 
        setError(null) 

        const datas = { name } 
        if (name === "") {
            setError("Veuillez remplir les champs vides.") 
        } else {
            uppCat(datas) 
        }
    } 

    // Récupération du genre spécifique lors du chargement du composant
    useEffect(() => {
        
        takeOneCategory(props.params.id)
            .then((res) => {
                if (res.status === 200) {
                setName(res.result.name) 
                }
            })
            .catch((err) => console.log(err))
    }, []) 

    // Redirection vers la liste des genres une fois la modification réussie
    if (redirect) {
        return <Navigate to="/admin/addcategories" /> 
    }

    return (
        <section id="edit-category">
            <p><Link to="/admin/addcategories">Retour à la liste des genres</Link></p>
            <h2>Modification d'un genre</h2>

            {/* Affichage des erreurs ou des messages de succès */}
            {error !== null && <p className="error">{error}</p>}

            <form onSubmit={onSubmitFormUpCat}>
                <input
                    type="text"
                    defaultValue={name}
                    onChange={(e) => setName(e.currentTarget.value)}
                />
                <input type="submit" value="Modifier" />
            </form>
        </section>
    ) 
} 

export default EditCategory
