import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { takeOneOrderUser } from "../../api/order"
import moment from "moment"
import { config } from "../../config"

const UserOrderDetail = (props) => {

    const [order, setOrder] = useState(null)

    useEffect(() => {
        takeOneOrderUser(props.params.id)
            .then((res) => {
                if (res.status === 200) {
                    setOrder(res.result)
                    //console.log(res.result)
                }
            })
            .catch((err) => console.log(err))
    }, [props.params.id])

    // Fonction pour regrouper les livres par id et leurs auteurs
    const groupBooksById = (order) => {
        const booksGrouped = {}

        order.forEach((item) => {
            const bookId = item.books_id

            // Si le livre existe déjà dans l'objet booksGrouped
            if (!booksGrouped[bookId]) {
                booksGrouped[bookId] = {
                    picture: item.picture,
                    alt_picture: item.alt_picture,
                    title: item.title,
                    quantity: item.quantity,
                    price: item.price,
                    date: item.date,
                    authors: [],
                }
            }

            // On ajouter l'auteur à la liste d'auteurs pour ce livre
            booksGrouped[bookId].authors.push({
                lastname: item.authorsLastname,
                firstname: item.authorsFirstname,
            })
        })

        return Object.values(booksGrouped)    // Retourne un tableau des livres groupés
    }

    return (
        <section className="order-display">
            <Link to="/profil">Retour au profil</Link>
            <h2>Commande n°{props.params.id}</h2>
            {order !== null && (
                <article>
                    <h3>
                        {order[0].firstname} {order[0].lastname}
                    </h3>
                    <p>{order[0].email}</p>
                    <p>{order[0].address}</p>
                    {order[0].complement_address !== null && (
                        <p>{order[0].complement_address}</p>
                    )}
                    <p>
                        {order[0].zip} {order[0].city}
                    </p>
                    <p>{order[0].phone}</p>
                </article>
            )}
            <article>
                <h3>Détails de la commande</h3>
                {order !== null && (
                    <p>du {moment(order[0].date).format("DD-MM-YYYY")}</p>
                )}
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Titre</th>
                            <th>Auteur(s)</th>
                            <th>Quantité</th>
                            <th>Prix</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order !== null &&
                            groupBooksById(order).map((book, index) => (
                                <tr key={index}>
                                    <td><img src={config.pict_url + book.picture} alt={book.alt_picture} /></td>
                                    <td>{book.title}</td>

                                    <td>{book.authors.map((author, idx) => (
                                        <p key={idx}>
                                            {author.firstname} {author.lastname}
                                        </p>
                                    ))}</td>

                                    <td>{book.quantity}</td>
                                    <td>{book.price} €</td>
                                </tr>
                            ))}
                    </tbody>

                    {order !== null && (
                        <tfoot>
                            <tr>
                                <td colSpan={5}>Total: {order[0].total_amount_books} €</td>
                            </tr>
                            <tr>
                                <td colSpan={5}>Poids total des livres: {order[0].total_weight} g</td></tr>
                            <tr>
                                <td colSpan={5}>Frais de livraison: {order[0].costs} €</td></tr>
                            <tr>
                                <td colSpan={5}>Total de la commande: {order[0].total_amount} €</td></tr>
                        </tfoot>
                    )}</table>
            </article>

        </section>
    )
}

export default UserOrderDetail   
