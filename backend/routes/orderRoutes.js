const withAuth = require('../middleware/withAuth')
const withAuthAdmin = require('../middleware/withAuthAdmin')

module.exports = (app, db) => {
    const UserModel = require("../models/UserModel")(db)
    const BooksModel = require("../models/BooksModel")(db)
    const OrderDetailsModel = require("../models/OrderDetailsModel")(db)
    const OrderModel = require("../models/OrderModel")(db)
    const orderController = require("../controllers/orderController")(UserModel, BooksModel, OrderModel, OrderDetailsModel)

    //route de sauvegarde complète d'une commande
    //Route sur Postman ok
    app.post('/api/order/save', withAuth, orderController.saveOrder)
    
    //route de gestion du paiement (va analyser le bon fonctionnement du paiement)
    app.post('/api/order/payment', withAuth, orderController.executePayment)
    
    //route de modification du status de paiement de la commande
    //Route sur Postman ok
    app.put('/api/order/updatePaymentStatus', withAuth, orderController.updatePaymentStatus)
    
    //route de récupération de toutes les commandes
    //Route sur Postman ok
    app.get('/api/orders/all', withAuthAdmin, orderController.getAllOrders)
    
    //route de récupération d'une commande par l admin
    //Route sur Postman ok
    app.get('/api/order/:id', withAuthAdmin, orderController.getOneOrder)
    
    //Route d'affichage des commandes d'un utilisateur
    //Route sur Postman ok
    app.get('/api/orders/user/:id', withAuth, orderController.getAllOrdersByUserId)
    
    //route de récupération d'une commande par un utilisateur
    //Route sur Postman ok
    app.get('/api/user/order/:id', withAuth, orderController.getOneOrder)
}
