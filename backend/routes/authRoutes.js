const withAuth = require("../middleware/withAuth")

module.exports = (app, db) => {
    const UserModel = require("../models/UserModel")(db)
    const authController = require("../controllers/authController")(UserModel)
    
    //route de vérification du token et de reconnexion automatique
    app.get("/api/user/checkToken", withAuth, authController.checkToken)
}