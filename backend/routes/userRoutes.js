const withAuth = require('../middleware/withAuth')
const withAuthAdmin = require('../middleware/withAuthAdmin')

module.exports = (app, db) => {
    const UserModel = require("../models/UserModel")(db)
    const userController = require("../controllers/userController")(UserModel)
    
    //route d'enregistrement d'un utilisateur
    //Route sur Postman ok
    app.post('/api/user/save', userController.saveUser)
    
    //route de connexion d'un utilisateur 
    //(création token qu'on va envoyer vers le front)
    //Route sur Postman ok
    app.post('/api/user/login', userController.loginUser)
    
    //route de modification d'un utilisateur
    //Route sur Postman ok
    app.put('/api/user/update/:id', withAuth, userController.updateUser)
    
    //route de suppression du compte d'un utilisateur
    //Route sur Postman ok
    app.delete('/api/user/delete/:id', withAuth, userController.deleteUser)
    
    //route d'affichage de tous les utilisateurs (users)
    //Route sur Postman ok
    app.get('/api/users/all', withAuthAdmin, userController.getAllUsers)
    
    //route d'affichage d'un utilisateur
    //Route sur Postman ok
    app.get('/api/user/details/:id', withAuthAdmin, userController.getOneUser)
}