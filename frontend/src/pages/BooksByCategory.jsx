import { useState, useEffect } from "react" 
import { AllBooksOneCat } from "../api/book" 
import { takeOneCategory } from "../api/category" 
import BookDisplay from "../components/BookDisplay" 

const BooksByCategory = (props) => {
    const [booksByCategory, setBooksByCategory] = useState([])    
    const [catName, setCatName] = useState("Chargement...")
    const [loading, setLoading] = useState(true)   // Indique si on charge les livres

    useEffect(() => {
        // Réinitialisation des livres et activation du chargement à chaque changement de genre
        setBooksByCategory([]) 
        setLoading(true) 

        //Récuperation d'un genre
        takeOneCategory(props.params.id)
            .then((res) => {
                if (res.status === 200) {
                    setCatName(res.result.name) 
                } else {
                    setCatName("Erreur de chargement de la catégorie") 
                }
            })
            .catch(err => console.log(err)) 

        // Récuperation des livres d'un genre
        AllBooksOneCat(props.params.id)
            .then((res) => {
                if (res.status === 200) {
                    const booksMap = new Map() 
                    res.result.forEach((book) => {
                        if (!booksMap.has(book.id)) {
                            booksMap.set(book.id, book) 
                        }
                    }) 
                     // Filtrage des livres avec un statut de 1
                     const filteredBooks = [...booksMap.values()].filter(book => book.status === 1)
                    setBooksByCategory(filteredBooks) 
                    
                } else {
                    setBooksByCategory([])   // Si aucun livre n'est trouvé, on vide la liste
                }
            })
            .catch(err =>console.log(err))
            
            .finally(() => {
                setLoading(false)   // Désactiver le chargement après avoir terminé
            }) 

    }, [props.params.id]) 

    return (
        <section id="category" className="container">
            {/* Toujours affichage du nom du genre*/}
            <h2>Genre: {catName}</h2>

            {/* Affichage d'un message de chargement ou les livres */}
            {loading ? (
                <p>Chargement en cours...</p>
            ) : booksByCategory.length > 0 ? (
                booksByCategory.map(book => <BookDisplay key={book.id} book={book} />)
            ) : (
                <p>Aucun livre pour le moment en {catName}.</p>
            )}
        </section>
    ) 
} 

export default BooksByCategory 
