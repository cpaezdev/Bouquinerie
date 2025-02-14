import { useState, useEffect } from "react"
//import { useDispatch } from "react-redux"
//import { loadBooks } from "../../../slices/bookSlice"
import { takeAllBooks, allAuthorsByBook } from "../../../api/book"
//import { deleteAuthorBooks } from "../../../api/author"
import { Link } from "react-router-dom"
import { config } from "../../../config"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'

const BooksList = () => {
    
    //const dispatch = useDispatch()
    const [books, setBooks] = useState([]) // List of books
    const [bookAuthors, setBookAuthors] = useState({}) // Map of authors by book

    // Fonction de suppression d'un livre préparée si l'administrateur décide un jour de supprimer des livres. Fonction vérifiée.
    const onClickDeleteBook = (id) => {
        deleteBook(id)
            .then((res) => {
                if (res.status === 200) {
                    // Recharger les livres après la suppression
                    takeAllBooks()
                        .then((response) => {
                            if (response.status === 200) {
                                // Mise à jour dans le store de Redux
                                dispatch(loadBooks(response.result))
                                setBooks(response.result)                              
                            }
                        })
                        .catch(err => console.log("Erreur lors de la mise à jour du store :", err))
                }
            })
            .catch(err => console.log("Erreur lors de la suppression du livre :", err))
    }

    const loadBooksData = () => {
        takeAllBooks()
            .then((res) => {
                if (res.status === 200) {
                    // On filtre les doublons
                    const uniqueBooks = res.result.filter(
                        (book, index, self) =>
                            index === self.findIndex((b) => b.id === book.id)
                    );
                    
                    setBooks(uniqueBooks);
    
                    // Récupération des auteurs pour chaque livre
                    uniqueBooks.forEach((book) => {
                        allAuthorsByBook(book.id)
                            .then((authorRes) => {
                                if (authorRes.status === 200) {
                                    setBookAuthors((prev) => ({
                                        ...prev,
                                        [book.id]: authorRes.result, // Stockage des auteurs par livre
                                    }));
                                }
                            })
                            .catch((err) =>
                                console.log("Erreur lors du chargement des auteurs :", err)
                            );
                    });
                } else {
                    console.log("Erreur lors du chargement des livres :", res);
                }
            })
            .catch((err) => console.log("Erreur lors du chargement des livres :", err));
    };

    useEffect(() => {
        loadBooksData() // Chargement des livres au premier rendu
    }, [])

    return (
        <section id="books-list">
            <p><Link to="/admin">Retour</Link></p>
            <h2>Liste des livres</h2>
            <p><Link to="/admin/addbooks">Ajouter un livre</Link></p>
          <article>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Titre</th>
                        <th>Auteur(s)</th>
                        <th>Statut</th>
                        <th>Modifier</th>
                    </tr>
                </thead>
                <tbody>
                    {books.length > 0 && (
                        books.map((book, idx) => (
                            <tr key={`${book.id}-${idx}`}>
                                <td><Link to={`/detail/${book.id}`}>
                                <img src={config.pict_url + book.picture} alt={book.alt_picture} /></Link></td>
                                <td>{book.title}</td>
                                <td>
                                    {bookAuthors[book.id] && bookAuthors[book.id].length > 0 && (
                                        bookAuthors[book.id].map((author, index) => (
                                            <p key={`${book.id}-${index}`}>
                                                {author.aFirstname} {author.aLastname}
                                            </p>
                                        ))
                                    )}
                                </td>
                                <td>{book.status}</td>
                                <td>
                                   {/* <button onClick={(e) => {
                                        e.preventDefault()
                                        onClickDeleteBook(book.id)
                                    }}>
                                        <FontAwesomeIcon icon={faTrashCan} />
                                    </button> */}
                                    <Link to={`/admin/edit/${book.id}`}>
                                        <FontAwesomeIcon icon={faPen} />
                                    </Link>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            </article>
        </section>
    )
}

export default BooksList
