const withAuthAdmin = require('../middleware/withAuthAdmin')

module.exports = (app, db) => {
    const BooksModel = require("../models/BooksModel")(db)
    const bookController = require("../controllers/bookController")(BooksModel)

    const AuthorsModel = require("../models/AuthorsModel")(db)
    const authorController = require("../controllers/authorController")(AuthorsModel)

    const AuthorsBooksModel = require("../models/AuthorsBooksModel")(db)
    const authorsBooksController = require("../controllers/authorsBooksController")(AuthorsBooksModel)

    const CategoriesModel = require("../models/CategoriesModel")(db)
    const categoryController = require("../controllers/categoryController")(CategoriesModel)

    const ConditionBooksModel = require("../models/ConditionBooksModel")(db)
    const conditionController = require("../controllers/conditionController")(ConditionBooksModel)


    //BOOKS(api/book.jsx)

    //Route pour récupérer tous les livres
    //Vérifiée sur Postman
    app.get('/api/books/all', bookController.getAllBooks)

    //Route pour récupérer un livre
    //Vérifiée sur Postman
    app.get('/api/book/:id', bookController.getOneBook)

    //Route pour récupérer tous les 4 derniers livres rentrés
    //Vérifiée sur Postman
    app.get('/api/books/lastbooks', bookController.getLastBooks)

    //Route pour récupérer tous les livres par genre
    //Vérifiée sur Postman
    app.get('/api/books/categorie/:id', bookController.getBooksByCategory)

    //Route pour récupérer tous les livres par état
    app.get('/api/books/condition/:id', bookController.getBooksByCondition)

    //route permettant d'enregistrer un livre
    //Vérifiée sur Postman
    app.post('/api/book/save', withAuthAdmin, bookController.saveBook)

    //route permettant de modifier un livre
    //Vérifiée sur Postman
    app.put('/api/book/update/:id', withAuthAdmin, bookController.updateBook)

    //route permettant de supprimer un livre
    //Vérifiée sur Postman
    app.delete('/api/book/delete/:id', withAuthAdmin, bookController.deleteBook)

    //route d'ajout d'une image dans l'api (stock l'image et retourne le nom)
    //Vérifiée sur Postman
    app.post('/api/book/pict', withAuthAdmin, bookController.savePicture)


    //AUTHORS(api/author.jsx)

    // Route pour enregistrer un auteur
    //Vérifiée sur Postman
    app.post('/api/author/save', withAuthAdmin, authorController.saveAuthor)

    // Route pour modifier un auteur
    //Vérifiée sur Postman
    app.put('/api/author/update/:id', withAuthAdmin, authorController.updateAuthor)

    // Route pour supprimer un auteur
    //Vérifiée sur Postman
    app.delete('/api/author/delete/:id', withAuthAdmin, authorController.deleteAuthor)

    //Route pour récupérer tous les auteurs
    //Vérifiée sur Postman
    app.get('/api/authors/all', authorController.getAllAuthors)

    //Route pour récupérer un auteur
    //Vérifiée sur Postman
    app.get('/api/author/:id', authorController.getAuthor)


    //AUTHORS_BOOKS

    //Route pour récupérer tous les auteurs d'un livre(api/book.jsx)
    //Vérifiée sur Postman
    app.get('/api/authorsbook/:id', authorsBooksController.getAllAuthorsByBook)

    //Route pour récupérer tous les livres par auteur(api/book.jsx)
    //Vérifiée sur Postman
    app.get('/api/booksauthor/:id', authorsBooksController.getAllBooksByAuthor)

    // Route pour enregistrer l'auteur d'un livre(api/author.jsx)
    //Vérifiée sur Postman
    app.post('/api/authorbook/save', withAuthAdmin, authorsBooksController.saveAuthorBook)

    // Route pour supprimer l'auteur d'un livre(api/author.jsx)
    //Vérifiée sur Postman
    app.delete('/api/authorbook/delete/:id', withAuthAdmin, authorsBooksController.delAuthorBook)

    //CATEGORIES(api/category.jsx)

    // Route pour enregistrer un genre
    //Vérifiée sur Postman
    app.post('/api/category/save', withAuthAdmin, categoryController.saveCategory)

    // Route pour modifier un genre
    //Vérifiée sur Postman
    app.put('/api/category/update/:id', withAuthAdmin, categoryController.updateCategory)

    // Route pour supprimer un genre
    //Vérifiée sur Postman
    app.delete('/api/category/delete/:id', withAuthAdmin, categoryController.deleteCategory)

    //Route pour récupérer tous les genres
    //Vérifiée sur Postman
    app.get('/api/categories/all', categoryController.getAllCategories)

    //Route pour récupére un genre
    //Vérifiée sur Postman
    app.get('/api/category/:id', categoryController.getOneCategory)


    //CONDITIONS

    // Route pour enregistrer un état
    //Vérifiée sur Postman
    app.post('/api/condition/save', withAuthAdmin, conditionController.saveCondition)

    // Route pour modifier un état
    //Vérifiée sur Postman
    app.put('/api/condition/update/:id', withAuthAdmin, conditionController.updateCondition)

    // Route pour supprimer un état
    //Vérifiée sur Postman
    app.delete('/api/condition/delete/:id', withAuthAdmin, conditionController.deleteCondition)

    //Route pour récupérer tous les états
    app.get('/api/conditions/all', conditionController.getAllConditions)

    //Route pour récupére un état
    app.get('/api/condition/:id', conditionController.getCondition)

}
