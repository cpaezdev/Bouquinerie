import { useState, useEffect } from "react"
import { allBooksByAuthor } from "../api/book"
import { oneAuthor } from "../api/author"
import BookDisplay from "../components/BookDisplay"

const BooksByAuthor = (props) => {
    const [booksByAuthor, setBooksByAuthor] = useState([])
    const [authName, setAuthName] = useState([])

    useEffect(() => {
        // Récupération d un auteur
        oneAuthor(props.params.id)
            .then((res) => {
                if (res.status === 200) {
                    setAuthName(res.result)
                }
            })
            .catch(err => console.log(err))

        // Récupération des livres de l'auteur
        allBooksByAuthor(props.params.id)
            .then((res) => {
                if (res.status === 200) {
                  // Filtrer les livres avec un statut égal à 1
                    const filteredBooks = res.result.filter(book => book.status === 1)
                    setBooksByAuthor(filteredBooks)
                }
            })
            .catch(err => console.log(err))
    }, [props.params.id])

    return (
        <section id="by-author" className="container">
           {/* Toujours afficher le prénom et le nom de l'auteur*/}
           <h2>Auteur: {authName.firstname} {authName.lastname}</h2>

            {/* Afficher les livres ici */}
            {booksByAuthor.length > 0
                ? booksByAuthor.map(book => <BookDisplay key={book.id} book={book} />)
                : <p>Aucun livre trouvé pour cet auteur.</p>}
        </section>
    )
}

export default BooksByAuthor
