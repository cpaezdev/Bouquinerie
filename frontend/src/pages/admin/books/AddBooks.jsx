import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { loadBooks } from "../../../slices/bookSlice"
import { selectUser } from "../../../slices/userSlice"
import { addOneBook, takeAllBooks } from "../../../api/book"

import { takeAllCategories } from "../../../api/category"
import { takeAllConditions } from "../../../api/condition"
import axios from "axios"
import { config } from "../../../config"
import { Navigate, Link } from "react-router-dom"

const AddBook = (props) => {
    
    const user = useSelector(selectUser)
    const dispatch = useDispatch()

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
    const [redirect, setRedirect] = useState(false)
    const [error, setError] = useState(null)

    // Fonction pour récupérer les catégories et les conditions 
    useEffect(() => {
        takeAllCategories()
            .then((res) => {
                if (res.status === 200) {
                    setCategories(res.result)
                }
            })
            .catch((err) => console.log(err)) 
    
        takeAllConditions()
            .then((res) => {
                if (res.status === 200) {
                    setConditions(res.result)
                   // console.log("CONDITIONS", res.result)
                }
            })
            .catch((err) => console.log(err)) 
    }, []) 

    //fonction de demande d'enregistrement de l'annonce
    const addProd = (datas) => {
        addOneBook(datas)
            .then((res) => {
                if (res.status === 200) {
                    takeAllBooks()
                        .then((response) => {
                            if (response.status === 200) {
                                //on met a jour le store de redux
                                dispatch(loadBooks(response.result))
                                setRedirect(true)
                            }
                        })
                        .catch(err => console.log(err))
                }
            })
            .catch(err => console.log(err))
    }

    const saveCompleteBook = () => {
        const datas = {
            title: title,
            edition: edition,
            picture: selectedFile === null ? "no-pict.webp" : "",
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
            price: price
        }

        if (selectedFile === null) {
            addProd(datas)
        } else {
            //on prépare l'objet formData qui permet le transport de l'image dans la requète ajax
            const formData = new FormData()
            formData.append("image", selectedFile)
            //requète AJAX d'ajout d'une image
            axios({
                method: "post",
                url: `${config.api_url}/api/book/pict`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-access-token': user.infos.token
                }
            })
                .then((res) => {
                    if (res.status === 200) {
                        //si l'image a bien été enregistrée
                        datas.picture = res.data.url
                        addProd(datas)
                    }
                })
                .catch(err => console.log(err))
        }
    }

    const onSubmitFormBook = (e) => {
        e.preventDefault()
        setError(null)
        if (title === "" || edition === "" || altPict === "" || category === "" || editAt === "" || format === "" || condition === "" || summary === "" || pages === "" || weight === "" || dimensions === "" || isbn === "" || price === "") {
            setError("Veuillez remplir les champs vides.")
        } else if (isNaN(price) || isNaN(weight)) {
            setError("Veuillez entrer un chiffre pour les champs poids et prix.")
        } else {
            saveCompleteBook()
        }
    }

    if (redirect) {
        return <Navigate to="/admin" />
    }

    return (
        <section id="add-books">
            <p><Link to="/admin/books">Retour à la liste de livres</Link></p>
            <h2>Ajout d'un livre</h2>
            {error !== null && <p className="error">{error}</p>}
            <form onSubmit={onSubmitFormBook}>
                <input
                    type="text"
                    placeholder="Titre"
                    onChange={(e) => setTitle(e.currentTarget.value)}
                />
                <input
                    type="text"
                    placeholder="Edition"
                    onChange={(e) => setEdition(e.currentTarget.value)}
                />
                <input
                    type="file"
                    onChange={(e) => setFile(e.currentTarget.files[0])}
                />
                <input
                    type="text"
                    placeholder="Description de la couverture du livre"
                    onChange={(e) => setAltPict(e.currentTarget.value)}
                />

                <label htmlFor="category">Genre</label>
                <select
                    name="category"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.currentTarget.value)}
                >
                    <option>-- Sélectionnez une catégorie --</option>
                    {categories.length > 0 && categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="Date de parution. Ex: 2024-01-01"
                    onChange={(e) => setEditAt(e.currentTarget.value)}
                />
                <input
                    type="text"
                    placeholder="Format"
                    onChange={(e) => setFormat(e.currentTarget.value)}
                />
               <label htmlFor="condition">État du livre</label>
                <select
                    name="condition"
                    id="condition"
                    value={condition}
                    onChange={(e) => setCondition(e.currentTarget.value)}
                >
                    <option>-- Sélectionnez une condition --</option>
                    {conditions.length > 0 && conditions.map((cond) => (
                        <option key={cond.id} value={cond.id}>
                            {cond.name}  
                        </option>
                    ))}
                </select>
                <textarea
                    name="Résumé"
                    placeholder="Quatrième de couverture"
                    onChange={(e) => setSummary(e.currentTarget.value)}
                ></textarea>
                <input
                    type="text"
                    placeholder="Nombre de pages"
                    onChange={(e) => setPages(e.currentTarget.value)}
                />
                <input
                    type="text"
                    placeholder="Poids du livre"
                    onChange={(e) => setWeight(e.currentTarget.value)}
                />
                <input
                    type="text"
                    placeholder="Dimensions du livre, ex: 10x17,8x2"
                    onChange={(e) => setDimensions(e.currentTarget.value)}
                />
                <input
                    type="text"
                    placeholder="ISBN"
                    onChange={(e) => setIsbn(e.currentTarget.value)}
                />
                <input
                    type="text"
                    placeholder="Prix"
                    onChange={(e) => setPrice(e.currentTarget.value)}
                />
                <input type="submit" value="Enregistrer" />
            </form>
        </section>
    )
}

export default AddBook
