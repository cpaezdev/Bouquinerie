module.exports = (_db) => {
    db = _db
    return OrderDetailsModel
}

class OrderDetailsModel {

    //sauvegarde d'un orderDetails
    //Vérifiée sur PhpMyAdmin
    static saveOneOrderDetails(orderId, books) {
    //ici books est un objet représentant un produit, il aura des propriétées nécéssaires pour notre requete book.id 
        return db.query('INSERT INTO orderdetails (orders_id, books_id, weight, quantity, price) VALUES (?, ?, ?, ?, ?)', [orderId, books.id, books.weight, books.quantity, books.price])
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }
}
