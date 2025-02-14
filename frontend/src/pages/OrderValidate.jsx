import { useState, useEffect } from "react"
import { takeOneOrderUser } from "../api/order"
import { Link } from "react-router-dom"
import moment from "moment"
import { config } from "../config"

const OrderValidate = (props) => {
    const [order, setOrder] = useState(null)
    const orderId = props.params.id
    
    useEffect(() => {
        takeOneOrderUser(props.params.id) // Utilise l'orderId provenant de l'URL
            .then((res) => {
                if (res.status === 200) {
                    setOrder(res.result)
                   // console.log("ORDER", res.result)
                }
            })
            .catch((err) => console.log(err))
    }, [props.params.id])

    const groupBooksById = (order) => {
        const booksGrouped = {}

        order.forEach((item) => {
            const bookId = item.books_id
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
            booksGrouped[bookId].authors.push({
                lastname: item.authorsLastname,
                firstname: item.authorsFirstname,
            })
        })

        return Object.values(booksGrouped)
    }

    return (
        <section className="order-display">
            <h2>Commande n°{props.params.id}</h2>
            {order !== null && (
                <article>
                    <h3>{order[0].firstname} {order[0].lastname}</h3>
                    <p>{order[0].email}</p>
                    <p>{order[0].address}</p>
                    {order[0].complement_address !== null && (
                        <p>{order[0].complement_address}</p>
                    )}
                    <p>{order[0].zip} {order[0].city}</p>
                    <p>{order[0].phone}</p>
                </article>
            )}
            <article>
                <h3>Détails de la commande</h3>
                {order !== null && <p>Commande du {moment(order[0].date).format("DD-MM-YYYY")}</p>}
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Titre</th>
                            <th>Auteurs</th>
                            <th>Quantité</th>
                            <th>Prix</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order !== null && groupBooksById(order).map((book, index) => (
                            <tr key={index}>
                                <td><img src={config.pict_url + book.picture} alt={book.alt_picture} /></td>
                                <td>{book.title}</td>
                                <td>
                                    {book.authors.map((author, idx) => (
                                        <p key={idx}>
                                            {author.firstname} {author.lastname}
                                        </p>
                                    ))}
                                </td>
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
                    )}
                </table>
                <Link to={`/payment/${orderId}`}><button>Payer</button></Link>
            </article>
        </section>
    )
}

export default OrderValidate
