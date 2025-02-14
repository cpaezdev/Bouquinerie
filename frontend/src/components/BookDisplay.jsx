import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { selectBasket, modifyBasket } from "../slices/basketSlice"
import { selectUser } from '../slices/userSlice'
import { config } from "../config"
import { Link } from "react-router-dom"
import { allAuthorsByBook } from '../api/book'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

const BookDisplay = ({ book }) => {

    const user = useSelector(selectUser)
    const basket = useSelector(selectBasket)
    const dispatch = useDispatch()

    const [authors, setAuthors] = useState([])
    const [quantity, setQuantity] = useState("")
    const [error, setError] = useState(false)

    //fonction d'ajout au panier
    const onClickBasket = (oldBasket, newProduct) => {
        let myQuantity

        // Si aucune quantité n'est spécifiée, on en met une par défaut de 1
        if (quantity === "") {
            myQuantity = 1
            setQuantity(1)   // Met à jour la quantité affichée
        } else {
            myQuantity = parseInt(quantity)
        }
        setError(null)

        let newBasket = [...oldBasket]

        // On vérifie si le produit existe déjà dans le panier
        const sameIndex = newBasket.findIndex((b) => b.id === newProduct.id)
        if (sameIndex === -1) {
            // Si le produit n'existe pas, on le rajoute au panier
            let myProduct = { ...newProduct, quantity: myQuantity }   // Ajouter la quantité au produit
            newBasket.push(myProduct)   // Ajouter le produit dans le panier
        } else {
            // Si le produit existe déjà, on ne peut pas le rajouter
            myQuantity === 1
        }

        // Sauvegarder le panier dans le localStorage avec ou sans userId
        if (user && user.infos.id) {
            // Si l'utilisateur est connecté, on utilise une clé avec son ID
            window.localStorage.setItem(`bds-basket-${user.infos.id}`, JSON.stringify(newBasket))
        } else {
            // Si l'utilisateur n'est pas connecté, on utilise une clé générique
            window.localStorage.setItem("bds-basket", JSON.stringify(newBasket))
        }

        // Mettre à jour le store Redux avec le nouveau panier
        dispatch(modifyBasket(newBasket))
    }
    useEffect(() => {
        // Chargement des auteurs du livre depuis l'API
        allAuthorsByBook(book.books_id)
            .then((res) => {
                if (res.status === 200 && res.result) {
                    setAuthors(res.result)
                    //console.log("AUTHORS", res.result)
                }
            })
            .catch((err) => console.log(err))
    }, [book.books_id])

    return (

        <article>
            {error !== null && <p className="error">{error}</p>}
            <Link to={`/detail/${book.id}`}>
                <img src={config.pict_url + book.picture} alt={book.alt_picture} />
                <h4>{book.title}</h4>
                <div id='authors-display'>   
                    {authors.length > 0 ? (
                        authors.map((a) => (
                            <p key={a.authors_id}>
                             {a.aFirstname} {a.aLastname}
                            </p>
                        ))
                    ) : (
                        <p>Auteur inconnu</p>
                    )}
                </div>
            </Link>
            <button onClick={() => onClickBasket(basket.basket, book)}>
                <FontAwesomeIcon icon={faCartShopping} /> {book.price} €
            </button>
        </article>
    )
}

export default BookDisplay 
