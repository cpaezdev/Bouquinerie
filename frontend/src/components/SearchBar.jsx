import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { takeAllBooks, allBooksByAuthor } from "../api/book"
import { allAuthors } from "../api/author"

const SearchBar = (props) => {

    const navigate = useNavigate()
    const [value, setValue] = useState("")
    const [books, setBooks] = useState([])
    const [bookByAuthors, setBookByAuthors] = useState([])
    const [authors, setAuthors] = useState([])

    /*-----RECHERCHE EN TEMPS REEL-----*/
    const search = (e) => {
        const query = e.target.value
        setValue(query)

        if (query.length > 1) {
            // Recherche de livres
            takeAllBooks(query)
                .then((res) => {
                    if (res.status === 200) {
                        const bookList = res.result
                        const exactMatch = bookList.find(book => book.title.toLowerCase() === query.toLowerCase())
                        const otherBooks = bookList.filter(book => book.title.toLowerCase() !== query.toLowerCase())

                        if (exactMatch) {
                            setBooks([exactMatch, ...otherBooks])
                        } else {
                            setBooks(bookList)
                        }
                    }
                })
                .catch((err) => console.log(err))

            // Recherche d'auteurs par nom
            allAuthors(query)
                .then((res) => {
                    if (res.status === 200) {
                        const authorList = res.result
                        // console.log("AuthorsList", authorList)
                        const exactMatchAuthor = authorList.find(author =>
                            (`${author.firstname} ${author.lastname}`).toLowerCase() === query.toLowerCase()
                        )
                        const otherAuthors = authorList.filter(author =>
                            (`${author.firstname} ${author.lastname}`).toLowerCase() !== query.toLowerCase()
                        )

                        if (exactMatchAuthor) {
                            setAuthors([exactMatchAuthor, ...otherAuthors])

                            // Si un auteur est trouvé, on utilise son ID pour récupérer les livres de cet auteur
                            allBooksByAuthor(exactMatchAuthor.id)
                                .then((res) => {
                                    if (res.status === 200) {
                                        const booksByAuthorList = res.result
                                        //console.log("BooksByAuthors", booksByAuthorList)
                                        const exactMatchBkAuth = booksByAuthorList.find(bByAuthor =>
                                            bByAuthor.title.toLowerCase() === query.toLowerCase()
                                        )
                                        const otherBkAuthors = booksByAuthorList.filter(bByAuthor =>
                                            bByAuthor.title.toLowerCase() !== query.toLowerCase()
                                        )

                                        if (exactMatchBkAuth) {
                                            setBookByAuthors([exactMatchBkAuth, ...otherBkAuthors])
                                        } else {
                                            setBookByAuthors(booksByAuthorList)
                                        }
                                    }
                                })
                                .catch((err) => console.log(err))
                        } else {
                            setAuthors(authorList)
                        }
                    }
                })
                .catch((err) => console.log(err))
        } else {
            setBooks([])
            setBookByAuthors([])
            setAuthors([])
        }
    }

    /*-----GESTION DE LA VALIDATION PAR LA TOUCHE "Entrée"-----*/
    const handleSubmit = (e) => {
        e.preventDefault()

        // Si des auteurs sont trouvés et qu'il y a des livres de ces auteurs
        if (authors.length > 0 && bookByAuthors.length > 0) {
            navigate(`/booksAuthors/${authors[0].id}`)
            resetSearch()  // On réinitialise la recherche
        } else if (books.length > 0) {
            // Si aucun auteur spécifique n'est trouvé, rediriger vers le premier livre trouvé
            navigate(`/detail/${books[0].id}`)
            resetSearch() // On réinitialise la recherche
        } else if (authors.length > 0) {
            // Si aucun livre n'est trouvé mais un auteur l'est, rediriger vers la page des livres de l'auteur
            navigate(`/booksAuthors/${authors[0].id}`)
            resetSearch() // On réinitialise la recherche
        } else {
            console.log("No books or authors found.")
        }
    }

    // Fonction pour vider les résultats et la barre de recherche après un clic
    const resetSearch = () => {
        setValue("")  
        setBooks([])  
        setBookByAuthors([])  
        setAuthors([])  
    }

    return (
            <>
                <form onSubmit={handleSubmit}>
                    <input
                        type="search"
                        placeholder="Quel livre ou auteur cherchez-vous ?"
                        value={value}
                        onChange={search}
                    />
                </form>
                {/* Affichage des résultats */}
                <ul>
                    {books.length > 0 && (
                        <>
                            {books && books.filter((val) => {
                                return val.title.toLowerCase().includes(value.toLowerCase())
                            }).map((val) => (
                                <li key={val.id} onClick={resetSearch}>
                                    <Link to={`/detail/${val.id}`}>{val.title}</Link>
                                </li>
                            ))}
                        </>
                    )}

                    {authors.length > 0 && (
                        <>
                            {authors.filter((author) => {
                                return (
                                    author.firstname.toLowerCase().includes(value.toLowerCase()) ||
                                    author.lastname.toLowerCase().includes(value.toLowerCase())
                                ) && (author.firstname.length > 0 || author.lastname.length > 0)
                            }).map((author) => (
                                <li key={author.id} onClick={resetSearch}>
                                    <Link to={`/booksAuthors/${author.id}`}>{author.firstname} {author.lastname}</Link>
                                </li>
                            ))}
                        </>
                    )}

                </ul>
            </>
    )
}

export default SearchBar