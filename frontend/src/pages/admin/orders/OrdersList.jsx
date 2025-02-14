import { useState, useEffect } from "react"
import { takeAllOrders, updatePaymentStatus } from "../../../api/order"
import { Link } from "react-router-dom"
import moment from "moment"

const OrdersList = (props) => {

  const [orders, setOrders] = useState([])
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  // Récupération de toutes les commandes
  const loadOrdersList = () => {
    takeAllOrders()
      .then((res) => {
        if (res.status === 200) {
          setOrders(res.result)
        }
      })
      .catch((err) => console.log(err))

  }

  useEffect(() => {
    loadOrdersList()
  }, [])

  // Regroupement des commandes par mois
  const groupByMonth = (orders) => {
    return orders.reduce((acc, order) => {
      const month = moment(order.date).format("YYYY-MM") // Regroupement par année et mois
      if (!acc[month]) {
        acc[month] = []
      }
      acc[month].push(order)
      return acc
    }, {})
  }

  const ordersByMonth = groupByMonth(orders)

  // Fonction pour mettre à jour le statut de la commande
  const handleStatusChange = (orderId, newStatus) => {
    updatePaymentStatus({ orderId, status: newStatus })
      .then((res) => {
        if (res.status === 200) {
          setSuccessMessage("Le statut a été mis à jour avec succès.")

          setOrders((prevOrders) =>
            prevOrders.map((order) =>
              order.id === orderId ? { ...order, status: newStatus } : order
            )
          )
        }
        else {
          setError("Erreur lors de la mise à jour du statut.")
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <section id="admin-order-list" className="container">
      <p><Link to="/admin">Retour</Link></p>
      
        <h2>Liste des commandes</h2>

        {/* Affichage des messages d'erreur ou de succès */}
        {error !== null && <p className="error">{error}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
        <article>
        {Object.keys(ordersByMonth)
          .sort((a, b) => new Date(b) - new Date(a)) // Tri des mois par ordre chronologique décroissant
          .map((month) => (
          <div key={month}>
            <h3>{moment(month, "YYYY-MM").format("MMMM YYYY")}</h3>
            <table>
              <thead>
                <tr>
                  <th>Numéro de commmande</th>
                  <th>Date</th>
                  <th>Nombre total de livres</th>
                  <th>Montant total des livres</th>
                  <th>Frais de livraison</th>
                  <th>Montant total</th>
                  <th>Modifier le statut</th>
                </tr>
              </thead>
              <tbody>
                {ordersByMonth[month].map((order) => (
                  <tr key={order.id}>
                    <td><Link to={`/admin/orderdetails/${order.id}`}>{order.id}</Link></td>
                    <td>{moment(order.date).format("DD-MM-YYYY")}</td>
                    <td>{order.total_books}</td>
                    <td>{order.total_amount_books} €</td>
                    <td>{order.costs} €</td>
                    <td>{order.total_amount} €</td>
                    <td>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault() 
                          handleStatusChange(order.id, e.target.status.value) 
                        }}
                      >
                        <input
                          type="text"
                          name="status"
                          defaultValue={order.status}
                        />
                        <input type="submit" value="Modifier" />
            
                      </form>
                    </td>
                  </tr>
                ))}

                {/* Ligne du chiffre d'affaire mensuel */}
                <tr id="ca">
                  <td colSpan={5}>
                    Chiffre d'affaire du mois :
                  </td>
                  <td>
                    {ordersByMonth[month].reduce(
                      (sum, order) => sum + order.total_amount_books,
                      0
                    )} €
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </article>
    </section>
  )
}

export default OrdersList
