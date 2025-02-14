import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectUser } from "../../../slices/userSlice"
import { loadBooks } from "../../../slices/bookSlice"
import { takeAllBooks, takeOneBook, updateBook } from "../../../api/book"
import { deleteAuthorBook } from "../../../api/author"
import { takeAllCategories } from "../../../api/category"
import { takeAllConditions } from "../../../api/condition"
import { allAuthors, saveAuthorsBook } from "../../../api/author"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'

import { Link, Navigate } from "react-router-dom"
import axios from "axios"
import { config } from "../../../config"
import moment from "moment"

const EditBook = (props) => {

    const user = useSelector(selectUser)
    const dispatch = useDispatch()

    const [book, setBook] = useState([])
    const [title, setTitle] = useState("")
    const [edition, setEdition] = useState("")
    const [altPict, setAltPict] = useState("")
    const [category, setCategory] = useState("") // Pour stocker la catégorie sélectionnée
    const [categories, setCategories] = useState([]) // Pour stocker toutes les catégories récupérées
    const [editAt, setEditAt] = useState("")
    const [format, setFormat] = useState("")
    const [condition, setCondition] = useState("") // Pour stocker l'état sélectionné
    const [conditions, setConditions] = useState([]) // Pour stocker toutes les états récupérés
    const [summary, setSummary] = useState("")
    const [pages, setPages] = useState("")
    const [weight, setWeight] = useState("")
    const [dimensions, setDimensions] = useState("")
    const [isbn, setIsbn] = useState("")
    const [price, setPrice] = useState("")
    const [selectedFile, setFile] = useState(null)
    const [oldPict, setOldPict] = useState(null)
    const [author, setAuthor] = useState("") // Pour stocker l'auteur sélectionnée 
    const [authors, setAuthors] = useState([]) // Pour stocker toutes les auteurs récupérés
    const [status, setStatus] = useState("")
    const [selectedAuthors, setSelectedAuthors] = useState([])  // Auteurs associés au livre
    const [error, setError] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    const [successMsg, setSuccessMsg] = useState(null)
    const [redirect, setRedirect] = useState(false)

    //Fonction de modification du livre 
    const upProd = (datas) => {
        updateBook(datas, props.params.id)
            .then((res) => {
                if (res && res.status === 200) {
                    // Rechargement des données du livre
                    takeOneBook(props.params.id)
                        .then((response) => {

                            const bookData = response.result
                            const editAtDate = moment(bookData.edit_at).format("YYYY-MM-DD")

                            // Mise à jour avec les nouvelles données
                            setBook(bookData)
                            setTitle(bookData.title)
                            setEdition(bookData.edition)
                            setOldPict(bookData.picture)
                            setAltPict(bookData.alt_picture)
                            setCategory(bookData.categories_id)
                            setEditAt(editAtDate)
                            setFormat(bookData.format)
                            setCondition(bookData.condition_books_id)
                            setSummary(bookData.summary)
                            setPages(bookData.pages)
                            setWeight(bookData.weight)
                            setDimensions(bookData.dimensions)
                            setIsbn(bookData.isbn)
                            setPrice(bookData.price)
                            setStatus(bookData.status)

                            // Mise à jour des auteurs sélectionnés
                            if (Array.isArray(bookData.authors_id)) {
                                setSelectedAuthors(bookData.authors_id)
                            } else {
                                setSelectedAuthors([])
                            }

                            // Afficher un message de succès
                            setSuccessMessage("Modification effectuée avec succès.")
                        })
                        .catch(err => console.log("Erreur lors de la récupération des données mises à jour: ", err))
                } else {
                    setError("Erreur lors de la modification.")
                }
            })
            .catch(err => console.log("Erreur lors de la mise à jour du livre :", err))
    }


    const upCompleteBook = () => {
        if (selectedFile === null) {
            // Si aucune nouvelle image n'est sélectionnée, on utilise l'ancienne image
            const datas = {
                title: title,
                edition: edition,
                picture: oldPict,
                alt_picture: altPict,
                categories_id: category,
                edit_at: editAt,
                format: format,
                condition_books_id: condition,
                summary: summary,
                pages: pages,
                weight: weight,
                dimensions: dimensions,
                isbn: isbn,
                price: price,
                status: status
            }
            upProd(datas)
        } else {
            // Si une nouvelle image est sélectionnée, on l'upload d'abord
            const formData = new FormData()
            formData.append("image", selectedFile)
            axios({
                method: "post",
                url: `${config.api_url}/api/book/pict`,
                data: formData,
                headers: {
                    'Content-type': 'multipart/form-data',
                    'x-access-token': user.infos.token
                }
            })
                .then((res) => {
                    if (res.status === 200) {
                        // Si l'image a bien été uploadée, on prépare les datas avec la nouvelle image.
                        const datas = {
                            title: title,
                            edition: edition,
                            picture: res.data.url,  //On utilise l'URL de la nouvelle image
                            alt_picture: altPict,
                            categories_id: category,
                            edit_at: editAt,
                            format: format,
                            condition_books_id: condition,
                            summary: summary,
                            pages: pages,
                            weight: weight,
                            dimensions: dimensions,
                            isbn: isbn,
                            price: price,
                            status: status
                        }
                        upProd(datas)   // Appel de la fonction de mise à jour
                    }
                })
                .catch(err => console.log(err))
        }
    }


    //Formulaire de modification du livre
    const onSubmitFormBook = (e) => {
        e.preventDefault()
        setError(null)
        if (title === "" || edition === "" || altPict === "" || category === "" || editAt === "" || format === "" || condition === "" || summary === "" || pages === "" || weight === "" || dimensions === "" || isbn === "" || price === "" || status === "") {
            setError("Veuillez remplir les champs vides.")
        } else if (isNaN(price) || isNaN(weight)) {
            setError("Veuillez entrer un chiffre pour les champs poids et prix.")
        } else {
            upCompleteBook()
        }
    }

    const handleAuthorChange = (authorsId) => {
        const booksId = props.params.id;

        // Sauvegarde de ou des auteurs associé au livre
        saveAuthorsBook({ books_id: booksId, authors_id: authorsId })
            .then((res) => {
                if (res.status === 200) {
                    loadBooksList();  // Rechargeùent de la liste des livres
                    setRedirect(true);
    
                    // Mise à jour de la liste des auteurs sélectionnés avec l'ID seulement
                    setSelectedAuthors((prevAuthors) => [...prevAuthors, authorsId]);
                    // console.log("Auteur ajouté avec succès");
                }
            })
            .catch(err => console.log(err));
    };
    

    //SUPPRESSION DE L AUTEUR DU LIVRE
    const handleAuthorDelete = () => {
        const booksId = props.params.id  // récupération de l'ID du livre
        deleteAuthorBook(booksId)
            .then((res) => {
                if (res.status === 200) {
                    loadBooksList()
                    setSelectedAuthors((prevAuthors) => {
                        if (Array.isArray(prevAuthors)) {
                            return prevAuthors.filter((a) => a.id !== booksId)
                        }
                        return []  // Retourne un tableau vide s'il ne s'agit pas d'un tableau
                    })
                    setSuccessMsg("Auteur(s) supprimé(s) avec succès")
                    //console.log("Auteur supprimé avec succès")
                } else {
                    console.log("Erreur lors de la suppression de l'auteur :", res.msg)
                }
            })
            .catch((err) => console.log(err))
    }

    //Formulaire d ajout auteur(s) du livre
    const onSubmitFormAuthors = (e) => {
        e.preventDefault()
        if (author !== "") {
            handleAuthorChange(author)  // Ajoute l'auteur sélectionné
        }
    }

    useEffect(() => {

        // Récupération de tous les genres
        takeAllCategories()
            .then((res) => {
                if (res.status === 200) {
                    setCategories(res.result)
                }
            })
            .catch((err) => console.log(err))

        // Récupération de tous les états
        takeAllConditions()
            .then((res) => {
                if (res.status === 200) {
                    setConditions(res.result)
                    //console.log("CONDITIONS", res.conditions)
                }
            })
            .catch((err) => console.log(err))
        // Récupération de tous les auteurs 
        allAuthors()
            .then((res) => {
                if (res.status === 200) {
                    setAuthors(res.result)
                    //console.log("AUTHORS", res.result)
                }
            })
            .catch((err) => console.log(err))

        //Récuparation du livre
        takeOneBook(props.params.id)
            .then((res) => {
                const bookData = res.result
                const editAtDate = moment(bookData.edit_at).format("YYYY-MM-DD") //Formatage avec Moment de la date d'édition
                setBook(res.result)
                setTitle(res.result.title)
                setEdition(res.result.edition)
                setOldPict(res.result.picture)
                setAltPict(res.result.alt_picture)
                setCategory(res.result.categories_id)
                setEditAt(editAtDate) // Utilisation la date formatée ici
                setFormat(res.result.format)
                setCondition(res.result.condition_books_id)
                setSummary(res.result.summary)
                setPages(res.result.pages)
                setWeight(res.result.weight)
                setDimensions(res.result.dimensions)
                setIsbn(res.result.isbn)
                setPrice(res.result.price)
                setStatus(res.result.status)

                // On s'assure que bookData.authors_id est un tableau avant de l'utiliser
                if (Array.isArray(bookData.authors_id)) {
                    setSelectedAuthors(bookData.authors_id)
                } else {
                    setSelectedAuthors([])  // Initialise un tableau vide s'il n'y a pas d'auteurs
                }
            })
            .catch(err => console.log(err))

        loadBooksList()

    }, [user])

    //------CHARGEMENT DE TOUS LES LIVRES ------//
    const loadBooksList = () => {
        takeAllBooks()
            .then((response) => {
                //console.log("ALLBOOKS", response)
                if (response.status === 200) {
                    dispatch(loadBooks(response.result))
                }
            })
            .catch(err => console.log(err))
    }

    if (redirect) {
        return <Navigate to="/admin/books" />
    }

    return (<section id="edit-book">

        <article>
            <h2>Modification du livre:</h2>

            <form onSubmit={onSubmitFormBook}>

                <input
                    type="text"
                    defaultValue={title}
                    onChange={(e) => setTitle(e.currentTarget.value)}
                />
                {/* Affichage photo de couverture actuelle */}
                {oldPict && (
                    <div>
                        <label>Photo de couverture</label>
                        <img src={config.pict_url + oldPict} alt={altPict} />
                    </div>
                )}
                <input
                    type="file"

                    onChange={(e) =>
                        setFile(e.currentTarget.files[0])
                    }
                />
                <input
                    type="text"
                    defaultValue={altPict}
                    onChange={(e) => setAltPict(e.currentTarget.value)}
                />
                <input
                    type="text"
                    defaultValue={edition}
                    onChange={(e) => setEdition(e.currentTarget.value)}
                />


                <label htmlFor="category">Genre</label>

                <select
                    name="category"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.currentTarget.value)}
                >
                    <option value={category.id}>{category.name}</option>
                    {categories.length > 0 && categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    defaultValue={editAt}
                    onChange={(e) => setEditAt(e.currentTarget.value)}
                />
                <input
                    type="text"
                    defaultValue={format}
                    onChange={(e) => setFormat(e.currentTarget.value)}
                />
                <label htmlFor="condition">État du livre</label>
                <select
                    name="condition"
                    id="condition"
                    value={condition}
                    onChange={(e) => setCondition(e.currentTarget.value)}
                >
                    <option value={condition.id}>{condition.name}</option>
                    {conditions.length > 0 && conditions.map((cond) => (
                        <option key={cond.id} value={cond.id}>
                            {cond.name}
                        </option>
                    ))}
                </select>
                <textarea
                    name="Résumé"
                    defaultValue={summary}
                    onChange={(e) => setSummary(e.currentTarget.value)}
                ></textarea>
                <input
                    type="text"
                    defaultValue={pages}
                    onChange={(e) => setPages(e.currentTarget.value)}
                />
                <input
                    type="text"
                    defaultValue={weight}
                    onChange={(e) => setWeight(e.currentTarget.value)}
                />
                <input
                    type="text"
                    defaultValue={dimensions}
                    onChange={(e) => setDimensions(e.currentTarget.value)}
                />
                <input
                    type="text"
                    defaultValue={isbn}
                    onChange={(e) => setIsbn(e.currentTarget.value)}
                />
                <input
                    type="text"
                    defaultValue={price}
                    onChange={(e) => setPrice(e.currentTarget.value)}
                />
                <input
                    type="text"
                    defaultValue={status}
                    onChange={(e) => setStatus(e.currentTarget.value)}
                />
                <input type="submit" value="Modifier" />
                {error !== null && <p className="error">{error}</p>}
                {successMessage && <p className="success">{successMessage}</p>}
            </form>
        </article>
        <article>
            <p><Link to="/admin/books">Retour à la liste des livres</Link></p>
            <h2>Ajout d'un ou plusieurs auteurs du livre :</h2>
            {error !== null && <p className="error">{error}</p>}
            {successMsg && <p className="success">{successMsg}</p>}
            <form onSubmit={onSubmitFormAuthors}>
                <label htmlFor="author">Choisir un auteur :</label>
                
                <select
                    name="author"
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.currentTarget.value)}
                >
                    <option value="{author.id}">Sélectionner un auteur</option>
                    {authors.length > 0 && authors.map((aut) => (
                        <option key={aut.id} value={aut.id}>
                            {aut.lastname} {aut.firstname}
                        </option>
                    ))}
                </select>
                <div>
              <input type="submit" value="Ajouter un auteur" />
              <button onClick={() => handleAuthorDelete()}>
                    <FontAwesomeIcon icon={faTrashCan} />
                </button>
                </div>
            </form>
        </article>

    </section>

    )
}

export default EditBook