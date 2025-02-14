const withAuthAdmin = require('../middleware/withAuthAdmin')

module.exports = (app, db) => {
    
    const ContactsModel = require('../models/ContactsModel')(db)
    const contactController = require('../controllers/contactController')(ContactsModel)
    
    //Route d'enregistrement d'un contact
    //Route sur Postman ok
    app.post('/api/contact/save', contactController.saveContactMsg)
    
    //Route de suppression du contact
    //Route sur Postman ok
    app.delete('/api/contact/delete/:id', withAuthAdmin, contactController.deleteContactMsg)
    
    //Route d'affichage de tous les contacts
    //Route sur Postman ok
    app.get('/api/contact/all', withAuthAdmin, contactController.getAllContactsMsg)
    
    //Route d'affichage d'un contact
    //Route sur Postman ok    
    app.get('/api/contact/:id', withAuthAdmin, contactController.getContactMsg)
    
}
