import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../slices/userSlice';
import { modifyBasket } from '../slices/basketSlice';
import { takeLastBooks } from "../api/book"
import { takeAllCategories } from "../api/category"
import BookDisplay from "../components/BookDisplay"
import { Link } from "react-router-dom"
import Facade from "../assets/shopImg/FacadeBDS.jpg"

const Home = (props) => {

    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const [books, setBooks] = useState([])
    const [categories, setCategories] = useState([])

    // Récupérer le panier lorsque l'utilisateur se connecte
    useEffect(() => {
        if (user && user.infos.id) {
            const userBasket = JSON.parse(window.localStorage.getItem(`bds-basket-${user.infos.id}`));
            if (userBasket) {
                dispatch(modifyBasket(userBasket)); // Mise à jour du panier dans le Redux store
            }
        }
    }, [user, dispatch]); // Ce hook est exécuté chaque fois que `user` change


    useEffect(() => {
        // Chargement des livres depuis l'API
        takeLastBooks()
            .then((res) => {
                if (res.status === 200) {

                    // Regroupement des livres par leur ID
                    const booksMap = new Map()

                    res.result.forEach((book) => {
                        if (!booksMap.has(book.id)) {
                            booksMap.set(book.id, book)
                        }
                    })

                    // Filtrage des livres dont le statut est égal à 1
                    const filteredBooks = [...booksMap.values()].filter(book => book.status === 1)

                    setBooks(filteredBooks)
                }
            })
            .catch((err) => console.log(err))

        takeAllCategories()
            .then((res) => {
                if (res.status === 200) {
                    return setCategories(res.result)
                }
            })
            .catch(err => console.log(err))

    }, [])

    return (
        <main className="container">
            <section>
                <h2>Les petits derniers</h2>

                {/* Affichage de chaque livre avec BookDisplay */}
                {books.length > 0 ? (
                    books.slice(0, 4).map((book) => (
                        <BookDisplay key={book.id} book={book} />
                    ))
                ) : (
                    <p>Chargement des livres...</p>
                )}
            </section>

            <section>
                <h2>Par genre</h2>
                <article>
                    {/* Limite à 12 catégories max */}
                    <ul>
                        {categories.slice(0, 12).map(category => <li key={category.id}><Link to={`/booksCategory/${category.id}`}>{category.name}</Link></li>)}
                    </ul>
                </article>
            </section>
            <section>
                <article>
                    <h2>Boutique dans le centre historique de Sarlat</h2>
                    <img src={Facade} alt="Façade de la Bouquinerie de Sarlat" />
                    <p>Sarlat-la-Canéda est une ville médiévale et la capitale du Périgord noir. La boutique, Bouquinerie de Sarlat, se trouve à 5 mètres de la Traverse, au 3 rue Papucie. </p>
                    <p>La Bouquinerie de Sarlat vous propose un large choix de livres d'occasion et d'expositions d'artistes et d'artisans locaux.</p>
                <Link to="/bookshop"><button>En savoir plus</button></Link>
                </article>
            </section>
        </main>
    )
}

export default Home 
