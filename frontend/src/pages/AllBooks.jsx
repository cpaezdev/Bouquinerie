import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { takeAllBooks } from "../api/book"
import BookDisplay from "../components/BookDisplay"


const AllBooks = (props) => {

    const [allBooks, setAllBooks] = useState([])

    useEffect(()=>{
        takeAllBooks()
        .then((res)=>{
            if(res.status === 200){
                setAllBooks(res.result)
               // console.log("AllBooks", res.result)
            }
        })
        .catch((err)=>console.log(err))
    }, [])

    //Fonction pour afficher chaque livres qu'une seule fois
    const getUniqueBook = (books) => {
        const booksMap = new Map()
        books.forEach((book) => {
            //Si un livre n'est pas encore dans la map, on l'ajoute
            if (!booksMap.has(book.id)) {
                booksMap.set(book.id, book)
            }
        })

        // On retourne un tableau de livres uniques
        return Array.from(booksMap.values())
    }

    //Récupération des livres uniques
    const uniqueBook = getUniqueBook(allBooks)

    // Filtrage des livres avec un statut de 1
    const filteredBooks = uniqueBook.filter((book) => book.status === 1)

    return (<section id="all-books" className="container">

        <h2>Tous les livres</h2>
        {filteredBooks.length > 0 && <>
            {filteredBooks.map((book) => {
                return <BookDisplay key={book.id} book={book} />
            })}
        </>
        }
    </section>)
}

export default AllBooks