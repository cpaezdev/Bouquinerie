import { useState, useEffect } from "react"
import { Navigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from '../slices/userSlice'
import { selectBasket, modifyBasket, cleanBasket } from '../slices/basketSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { saveOneOrder } from '../api/order'
import { config } from "../config"
import { allAuthorsByBook } from '../api/book'

const Basket = (props) => {
    const basket = useSelector(selectBasket)
    const user = useSelector(selectUser)
    const dispatch = useDispatch()

    const [orderId, setOrderId] = useState(null) // Ajout de orderId pour gérer la redirection
    const [bookAuthors, setBookAuthors] = useState({})
    const [redirect, setRedirect] = useState(false)
    const [redirect2, setRedirect2] = useState(false)

 
    // Au click, enregistrement de la commande et envoi vers la validation de la commande
    const onClickSaveOrder = (e) => {
        e.preventDefault()
        if (user.isLogged) {
            const datas = {
                users_id: user.infos.id,
                basket: basket.basket
            }
            saveOneOrder(datas)
                .then((res) => {
                    if (res.status === 200) {
                        setOrderId(res.orderId)
                        setRedirect(true)
                        
                    } else {
                        console.log('Erreur de sauvegarde de la commande:', res)
                    }
                })
                .catch(err => console.log(err))
        } else {
            setRedirect2(true) // Redirection vers la page de connexion si l'utilisateur n'est pas connecté
        }
    }

    // Au click on supprime un livre du panier
    const removeBasket = (oldBasket, myBook) => {
        let newBasket = oldBasket.filter(b => b.id !== myBook.id)
        let lsBasket = JSON.stringify(newBasket)
        if (user && user.infos.id) {
            window.localStorage.setItem(`bds-basket-${user.infos.id}`, lsBasket)
        } else {
            window.localStorage.setItem("bds-basket", lsBasket)
        }
        dispatch(modifyBasket(newBasket))
    }

    const empty = () => {
        if (user && user.infos.id) {
            window.localStorage.removeItem(`bds-basket-${user.infos.id}`)
        } else {
            window.localStorage.removeItem("bds-basket")
        }
        dispatch(cleanBasket())
    }

    // Chargement des auteurs pour chaque livre du panier
    useEffect(() => {
        const getAuthors = async () => {
            let authorsByBook = {}
            for (const book of basket.basket) {
                if (!authorsByBook[book.id]) {
                    const res = await allAuthorsByBook(book.id)
                    if (res.status === 200 && res.result) {
                        authorsByBook[book.id] = res.result
                    }
                }
            }
            setBookAuthors(authorsByBook)
        }
        if (basket.basket.length > 0) {
            getAuthors()
        }
    }, [basket.basket])

    if (redirect && orderId) {
        return <Navigate to={`/ordervalidate/${orderId}`} />
    }
    if (redirect2) {
        return <Navigate to="/login" />
    }

    return (
        <section id="basket">
            <h2>Panier de commande</h2>
            <article>
                {basket.basket.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Titre</th>
                                <th>Auteur(s)</th>
                                <th>Qté</th>
                                <th>Prix</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td></td>
                                <td>Total:</td>
                                <td>{basket.totalBooks}</td>
                                <td>{basket.totalAmountBooks}€</td>
                            </tr>
                            <tr>
                                <td colSpan={7}>
                                    <button onClick={(e) => { onClickSaveOrder(e) }}>
                                        Valider le panier
                                    </button>
                                </td>
                            </tr>
                        </tfoot>
                        <tbody>
                            {basket.basket.map((book) => (
                                <tr key={book.id}>
                                    <td><Link to={`/detail/${book.id}`}><img src={config.pict_url + book.picture} alt={book.alt_picture} /></Link></td>
                                    <td><Link to={`/detail/${book.id}`}>{book.title}</Link></td>
                                    <td>{bookAuthors[book.id] ? (
                                        bookAuthors[book.id].map((author, idx) => (
                                            <p key={idx}>
                                                {author.aFirstname} {author.aLastname}
                                            </p>
                                        ))
                                    ) : (
                                        <p colSpan={2}>Chargement des auteurs...</p>
                                    )}</td>

                                    <td>{book.quantity}</td>
                                    <td>{book.price} €</td>
                                    <td>
                                        <button onClick={() => { removeBasket(basket.basket, book) }}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Votre panier est vide</p>
                )}
                {basket.basket.length > 0 && (
                    <p>
                        <a href="#" onClick={() => { empty() }}>Vider le panier</a>
                    </p>
                )}
            </article>
        </section>
    )
}

export default Basket
