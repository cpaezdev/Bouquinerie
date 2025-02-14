import { takeOneBook, allAuthorsByBook } from "../api/book"
import { takeAllConditions } from "../api/condition"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectBasket, modifyBasket } from "../slices/basketSlice"
import { selectUser } from '../slices/userSlice'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faCircleInfo } from '@fortawesome/free-solid-svg-icons'

import { config } from "../config"
import { Link } from "react-router-dom"
import moment from "moment"

const Detail = (props) => {
    const user = useSelector(selectUser)
    const basket = useSelector(selectBasket)
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState("")
    const [book, setBook] = useState([])
    const [authors, setAuthors] = useState([])
    const [conditions, setConditions] = useState([])
    const [showConditions, setShowConditions] = useState(false)
    const [error, setError] = useState(false)


    //fonction d'ajout au panier
    const onClickBasket = (oldBasket, newProduct) => {
        let myQuantity

        // Si aucune quantité n'est spécifiée, on en met une par défaut de 1
        if (quantity === "") {
            myQuantity = 1
            setQuantity(1) // Met à jour la quantité affichée
        }
        else {
            myQuantity = parseInt(quantity)
        }

        setError(null) // Réinitialiser les erreurs

        // Assurez-vous que oldBasket est bien un tableau
        let newBasket = [...oldBasket]

        // Vérifier si le produit existe déjà dans le panier
        const sameIndex = newBasket.findIndex((b) => b.id === newProduct.id)

        if (sameIndex === -1) {
            // Si le produit n'existe pas, on le rajoute au panier
            let myProduct = { ...newProduct, quantity: myQuantity } // Ajouter la quantité au produit
            newBasket.push(myProduct) // Ajouter le produit dans le panier

        }
        else {
            // Si le produit existe déjà, on ne peut pas le rajouter
            myQuantity === 1
        }

        // Sauvegarder le panier dans le localStorage avec ou sans userId
        if (user && user.infos.id) {
            // Si l'utilisateur est connecté, on utilise une clé avec son ID
            window.localStorage.setItem(`bds-basket-${user.infos.id}`, JSON.stringify(newBasket))
        }
        else {
            // Si l'utilisateur n'est pas connecté, on utilise une clé générique
            window.localStorage.setItem("bds-basket", JSON.stringify(newBasket))
        }

        // Mettre à jour le store Redux avec le nouveau panier
        dispatch(modifyBasket(newBasket))
    }

    const allConditions = () => {
        takeAllConditions()
            .then((res) => {
                if (res.status === 200) {
                    setConditions(res.result)
                    //console.log("Conditions", res.result)

                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        // Chargement des détails du livre
        takeOneBook(props.params.id)
            .then((res) => {
                const bookData = res.result
                if (bookData.status === 1) {
                    setBook(bookData)
                    // Chargement des auteurs du livre
                    allAuthorsByBook(props.params.id)
                        .then((res) => {
                            if (res.status === 200 && res.result) {
                                setAuthors(res.result)
                            }
                        })
                        .catch((err) => console.log(err))
                }
                else {
                    setBook(null) // Si le livre est vendu, on ne stocke pas les détails
                }
            })
            .catch(err => console.log(err))
    }, [props.params.id])

    // Fonction pour gérer l'affichage desétats
    const toggleConditions = () => {
        if (!showConditions) {
            allConditions() // On charge les états uniquement si on les affiche
        }
        setShowConditions(!showConditions) // Inverser la visibilité
    }

    return (
        <section id="detail" className="container">
        <Link to="/" >Retour à l'accueil</Link>
        {/*Si le livre est à la vente, on affiche les détails*/}
        {book ? (<>
            <article>
                <img src={config.pict_url + book.picture} alt={book.alt_picture} />
                <h2>{book.title}</h2>
              <div>{authors.length > 0 ? (
                    authors.map((author, index) => (
                        <p key={author.authors_id}> {author.aFirstname} {author.aLastname}</p>
                    ))
                ) : (
                    <p>Auteur inconnu</p>
                )}
                </div> 
                <p><strong>Edition:</strong> {book.edition}</p>
                <p><strong>Format:</strong> {book.format}</p>
                <p><strong>Date de publication:</strong> {moment(book.edit_at).format("DD-MM-YYYY")}</p>
                <p><strong>Genre:</strong> {book.categoryName}</p>
                <p><button onClick={() => toggleConditions()}>
                <FontAwesomeIcon icon={faCircleInfo} /></button><strong>Etat:</strong> {book.conditionName} {/* Bouton pour afficher les conditions */}
                </p>
                {/* Section visible uniquement si showConditions est true */}
                {showConditions && (
                    <ul>
                        <h4>Etats des livres</h4>
                        <p>Tous nos livres d’occasion ont leurs propres histoires. La couverture et le dos peuvent présenter de petits défauts. Le papier avec le temps peut être jauni sans pour autant gêner la lecture. Toutes les pages sont présentes.</p>
                        <p>*Photo non contractuelle.</p>
                        <p>Différents états des livres vendus sur notre site :</p>
                        {conditions.length > 0 && conditions.map((cond) => (
                            <li key={cond.id}>- {cond.name}</li>
                        ))}
                    </ul>
                )}
             
                <button id="price" onClick={() => onClickBasket(basket.basket, book)}>
                    <FontAwesomeIcon icon={faCartShopping} /> {book.price} €
                </button>
                </article>
                <article>
                <h3>Quatrième de couverture</h3>
                <p>{book.summary}</p>
                <h3>Details techniques</h3>
                <ul>
                    <li>Nombres de pages: {book.pages}</li>
                    <li>Poids: {book.weight} g</li>
                    <li>Dimensions: {book.dimensions} cm</li>
                    <li>ISBN: {book.isbn}</li>
                </ul>
                
            </article>
                 
            <article>
                <h4><Link to={`/booksAuthors/${book.authors_id}`}>Livres du même auteur</Link></h4>
                <h4><Link to={`/booksCategory/${book.categories_id}`}>Livres du même genre</Link></h4>
            </article>
              </>
              ) : (
                 // Si le livre est vendu, on affiche un message
                <p id="sold">Livre vendu</p>
            )}
        </section>
    )
}

export default Detail
