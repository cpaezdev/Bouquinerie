module.exports = (_db) => {
    db = _db
    return OrderModel
}

class OrderModel {

    //validation d'une commande
    //Vérifiée sur PhpMyAdmin
    static saveOneOrder(userId, totalBooks, totalAmountBooks, totalWeight, costs, totalAmount) {
        return db.query('INSERT INTO orders (users_id, date, total_books, total_amount_books, total_weight, costs, total_amount) VALUES (?, NOW(), ?, ?, ?, ?, ?)', [userId, totalBooks, totalAmountBooks, totalWeight, costs, totalAmount])
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }

    //Modification du status de la commande
    //Vérifiée sur PhpMyAdmin
    static updateStatus(orderId, status) {
        return db.query('UPDATE orders SET status = ? WHERE id = ?', [status, orderId])
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }

    /*  REQUETES REDIGEES MAIS NON UTILISEES POUR CAUSE DE FRAUDES
        //Supression d'une commande
        //Vérifiée sur PhpMyAdmin
        static deleteOneOrder(orderId) {
            return db.query('DELETE FROM orders WHERE id = ?', [orderId])
                .then((res) => {
                    return res
                })
                .catch((err) => {
                    return err
                })
        }
        //Modification d'une commande
        //Vérifiée sur PhpMyAdmin
        static updateOrder(orderId, totalBooks, totalAmountBooks, totalWeight, costs, totalAmount) {
            return db.query('UPDATE orders SET total_books = ?, total_amount_books = ?, total_weight = ?, costs =?, total_amount = ? WHERE id = ?', [orderId, totalBooks, totalAmountBooks, totalWeight, costs, totalAmount])
                .then((res) => {
                    return res
                })
                .catch((err) => {
                    return err
                })
        }*/


    //récupération de toutes les commandes
    //Vérifiée sur PhpMyAdmin
    static getAllOrders() {
        return db.query('SELECT id, date, total_books, total_amount_books, costs, total_amount, status FROM orders ORDER BY id DESC')
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }

    //récupération de toutes les commandes d'un utilisateur
    //Vérifiée sur PhpMyAdmin
    static getAllOrdersByUserId(userId) {
        return db.query('SELECT id, date, total_books, total_amount_books, costs, total_amount, status FROM orders WHERE users_id = ? ORDER BY id DESC', [userId])
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }

    //récupération du contenu de la commande
    //Vérifiée sur PhpMyAdmin
    static getOneOrder(id) {
        return db.query(`SELECT 
            users.lastname, users.firstname, users.email, phone, address, complement_address, zip, city,
            books.picture, books.alt_picture, books.title, books.format, 
            authors_books.books_id, authors_books.authors_id, 
            authors.lastname AS authorsLastname, authors.firstname AS authorsFirstname,
            orderdetails.orders_id, orderdetails.books_id, orderdetails.quantity, orderdetails.price,
            orders.users_id, orders.id, orders.date, orders.total_weight, orders.total_amount_books, orders.costs, total_amount, orders.status
            FROM orders
            LEFT JOIN users 
                ON orders.users_id = users.id
            LEFT JOIN orderdetails 
                ON orders.id = orderdetails.orders_id   
            LEFT JOIN books 
                ON orderdetails.books_id = books.id
            LEFT JOIN authors_books 
        ON books.id = authors_books.books_id 
        LEFT JOIN authors
        ON authors_books.authors_id = authors.id 
            WHERE orders.id = ?`, [id])
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }

}
