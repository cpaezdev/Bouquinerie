const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const withAuth = require('../middleware/withAuth')

module.exports = (UserModel, BooksModel, OrderModel, OrderDetailsModel) => {

    const saveOrder = async(req, res) => {
        try {
          
            // 1 - Récupérer l'id de l'utilisateur connecté

            const userId = req.body.users_id

            // 2 - Boucler sur le panier afin de calculer les données ( nbr de livre, total price, ...)

            let totalBooks = 0
            let totalAmountBooks = 0
            let totalWeight = 0
            let costs = 0
            let totalAmount = 0

            req.body.basket.map(async(b) => {

                totalBooks += b.quantity
                totalAmountBooks += b.price
                totalWeight += b.weight

                //Si Weight est supérieur à 10000g = 10kg --> refuser la commande
                if (totalWeight > 10000) {
                    return res.json({ status: 400, msg: "Désolé, le poids maximal d'une commande (10kg) a été dépassé. Veuillez retirer quelques livres." })
                }
                else {

                    switch (true) {
                        case (totalWeight < 250):
                            costs = 4.99 //Coût de livraison pour les colis pesant entre 250g et 500g
                            break;
                        case (totalWeight < 500):
                            costs = 6.99 // Coût de livraison pour les colis pesant entre 250g et 500g
                            break;
                        case (totalWeight < 750):
                            costs = 8.10 // Coût de livraison pour les colis pesant entre 500g et 750g
                            break;
                        case (totalWeight < 1000):
                            costs = 8.80 // Coût de livraison pour les colis pesant entre 750g et 1kg
                            break;
                        case (totalWeight < 2000):
                            costs = 10.15 // Coût de livraison pour les colis pesant entre 1kg et 2kg
                            break;
                        case (totalWeight < 5000):
                            costs = 15.60 // Coût de livraison pour les colis pesant entre 1kg et 2kg
                            break;
                        case (totalWeight < 10000):
                            costs = 22.70 // Coût de livraison pour les colis pesant entre 1kg et 2kg
                            break;
                    }
                }
                totalAmount = totalAmountBooks + costs
            })
            // 3 - INSERT INTO dans la table "orders"

            const orderInfos = await OrderModel.saveOneOrder(userId, totalBooks, totalAmountBooks, totalWeight, costs, totalAmount)
            // 4 - --> Si l'INSERT INTO ne s'est pas bien déroulé
            // --> On s'arrête
            if (orderInfos.code) {
                res.json({ status: 500, msg: "1 Echec de l'enregistrement de la commande" })
            }
            // 4 - --> Si l'INSERT INTO s'est bien déroulé --> Récupérer l'id de la commande
            // --> On va reboucler sur le panier et pour chaque "books", --> INSERT INTO dans "orderDetails" avec l'id de la commande
            else {
                const id = orderInfos.insertId

                req.body.basket.map(async(b) => {
                    const book = await BooksModel.getOneBook(b.id)

                    if (book.code) {
                        res.json({ status: 500, msg: "2 Echec enregistrement de la commande" })
                    }
                    else {
                        b.weight = book[0].weight
                        b.quantity = book[0].quantity
                        b.price = book[0].price

                        const details = await OrderDetailsModel.saveOneOrderDetails(id, b)
                
                        if (details.code) {
                            res.json({ status: 500, msg: "3 Echec enregistrement de la commande" })
                        }
                       else {
                            b.status = "0"
                            const updateStatusBook = await BooksModel.updateStatusBook(b.id, b.status)

                            if (updateStatusBook.code) {
                                res.json({ status: 500, msg: "3bis Echec enregistrement de la commande" })
                            }
                        }
                    }
                })
                // 5 - message " Votre commande a bien été validée"
                res.json({ status: 200, msg: "Votre commande a bien été validée.", orderId: id })
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "4 Echec enregistrement de la COMMANDE" })
        }
    }

    //gestion du paiement (va analyser le bon fonctionnenement du paiement)
    const executePayment = async(req, res) => {
        try {
            const order = await OrderModel.getOneOrder(req.body.orderId)
            if (order.code) {
                res.json({ status: 500, msg: "Le paiement ne peut pas être vérifié" })
            }
            else {
               // console.log("Total amount", order[0].total_amount * 100)
                const paymentIntent = await stripe.paymentIntents.create({
                    amount: order[0].total_amount * 100,
                    currency: 'eur',
                    metadata: { integration_check: 'accept_a_payment' },
                    receipt_email: req.body.email
                })
                res.json({ status: 200, client_secret: paymentIntent['client_secret'] })
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Le paiement ne peut pas être vérifié!" })
        }
    }

    const updatePaymentStatus = async(req, res) => {
        try {
            
            const updateStatus = await OrderModel.updateStatus(req.body.orderId, req.body.status)
            
            if (updateStatus.code) {
                res.json({status: 500, msg: "Le statut de paiement de la commande ne peut pas être modifié" })
            }
            else {
                res.json({status: 200, result : updateStatus})
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Le statut de paiement de la commande ne peut pas être modifié!" })
        }
    }

    const getAllOrders = async(req, res) => {
        try {
            const orders = await OrderModel.getAllOrders()
        
            if (orders.code) {
                res.json({ status: 500, msg: "Echec, affichage des commandes impossible" })
            }
            else {
                res.json({ status: 200, result: orders })
            }
        }
        catch (err) {
            res.json({status: 500, msg: "Echec, affichage des commandes impossible"})
        }
    }

    const getOneOrder = async(req, res) => {
        try {
            const order = await OrderModel.getOneOrder(req.params.id)

            if (order.code) {
                res.json({status: 500, msg: "Affichage de la commande impossible, une erreur est survenue"})
            }
            else {
                res.json({ status: 200, result: order })
            }
        }
        catch (err) {
            res.json({status: 500, msg: "Erreur, la commande ne peut être affichée"})
        }
    }
    
    const getAllOrdersByUserId = async(req, res) => {
        try{
            
            const orderUser = await OrderModel.getAllOrdersByUserId(req.params.id)
            
            if(orderUser.code){
                res.json({status: 500, msg: "Erreur, votre commande ne peut être affichée"})
            }else{
                res.json({status: 200, result : orderUser})
            }
            
        }catch(err){
             res.json({status: 500, msg: "Erreur, votre commande ne peut être affichée"})
        }
    }

    return {
        saveOrder,
        executePayment,
        updatePaymentStatus,
        getAllOrders,
        getOneOrder,
        getAllOrdersByUserId
    }

}
