module.exports = (_db) => {
    db = _db
    return BooksModel
}

class BooksModel {

    //Récupération de tous les livres
    //Requete SQL sur phpmyAdmin ok
    //Route postman ok
    static getAllBooks() {
        return db.query(`SELECT 
            books.id, books.picture, books.alt_picture, books.title, books.price, books.status, books.weight, books.status,
            authors_books.books_id, authors_books.authors_id, 
            authors.lastname AS authorsLastname, authors.firstname AS authorsFirstname
            FROM books 
            LEFT JOIN authors_books 
                ON books.id = authors_books.books_id 
            LEFT JOIN authors 
                ON authors_books.authors_id = authors.id 
            ORDER BY books.id DESC`)
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }

    //Récupération d'un seul livre
    //Requete SQL sur phpmyAdmin ok
    //Route postman ok
    static getOneBook(id) {
        return db.query(`SELECT 
            books.*, 
            authors_books.books_id, authors_books.authors_id, books.status, 
            authors.lastname, authors.firstname, 
            condition_books.name AS conditionName, 
            categories.name AS categoryName 
            FROM books 
            LEFT JOIN authors_books 
                ON books.id = authors_books.books_id 
            LEFT JOIN authors 
                ON authors_books.authors_id = authors.id 
            LEFT JOIN condition_books 
                ON condition_books.id = books.condition_books_id 
            LEFT JOIN categories 
                ON categories.id = books.categories_id 
            WHERE books.id = ?`, [id])
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }


    
    //Récupération des 4 derniers livres rentrés avec auteur(s)
    //Requete SQL sur phpmyAdmin ok
    //Route postman ok
    //rajout authors et books_id
    static getLastFourBooks() {
        return db.query(`SELECT 
        books.id, books.picture, books.alt_picture, books.title, books.price, books.format, books.edition, books.weight, books.status,
        authors_books.books_id
        FROM books 
        LEFT JOIN authors_books 
        ON books.id = authors_books.books_id 
        LEFT JOIN authors
        ON authors_books.authors_id = authors.id 
        ORDER BY books.id DESC
        LIMIT 6`)
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }



    //Récupération de tous les livres d'une même catégorie
    //Requete SQL sur phpmyAdmin ok
    //Route postman ok

    static getAllBooksOneCat(categoryId) {
        return db.query(`SELECT 
            books.id, books.picture, books.alt_picture, books.title, books.price, books.weight, books.status,
            authors_books.books_id, authors_books.authors_id, 
            authors.lastname, authors.firstname,  
            categories_id AS categoryId,
            categories.name AS categoryName
            FROM books
            LEFT JOIN categories
                ON books.categories_id = categories.id
            LEFT JOIN authors_books 
                ON books.id = authors_books.books_id 
            LEFT JOIN authors  
                ON authors_books.authors_id = authors.id 
            WHERE categories_id = ? 
            ORDER BY books.id DESC`, [categoryId])
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }

    //Récupération de tous les livres qui ont le même état(condition_books)
    //Requete SQL sur phpmyAdmin 
    //Route postman ok
    static getAllBooksOneCond(conditionbooksId) {
        return db.query(`SELECT
            books.picture, books.alt_picture, books.title, books.price, books.weight, books.status,
            authors_books.books_id, authors_books.authors_id, 
            authors.lastname, authors.firstname, 
            condition_books_id AS conditionbooksId
            FROM books 
            LEFT JOIN authors_books 
                ON books.id = authors_books.books_id 
            LEFT JOIN authors 
                ON authors_books.authors_id = authors.id 
            WHERE condition_books_id = ? 
            ORDER BY books.id DESC`, [conditionbooksId])
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }

    //Sauvegarde d'un livre
    //Requete SQL sur phpmyAdmin ok
    //Route postman ok
    static saveOneBook(req) {
        return db.query("INSERT INTO books (title, edition, picture, alt_picture, categories_id, edit_at, format, condition_books_id, summary, pages, weight, dimensions, isbn, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [req.body.title, req.body.edition, req.body.picture, req.body.alt_picture, req.body.categories_id, req.body.edit_at, req.body.format, req.body.condition_books_id, req.body.summary, req.body.pages, req.body.weight, req.body.dimensions, req.body.isbn, req.body.price])
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }

    //Modification d'un livre
    //Requete SQL sur phpmyAdmin ok
    //Route postman ok
    static updateOneBook(req, id) {
        return db.query("UPDATE books SET title = ?, edition = ?, picture = ?, alt_picture = ?, categories_id = ?, edit_at = ?, format = ?, condition_books_id = ?, summary = ?, pages = ?, weight = ?, dimensions = ?, isbn = ?, price = ?, status = ? WHERE id = ?", [req.body.title, req.body.edition, req.body.picture, req.body.alt_picture, req.body.categories_id, req.body.edit_at, req.body.format, req.body.condition_books_id, req.body.summary, req.body.pages, req.body.weight, req.body.dimensions, req.body.isbn, req.body.price, req.body.status || 1, id])
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }
    
    //Modification du status du Livre
    //Requete SQL sur phpmyAdmin ok
    //Route postman ok
    static updateStatusBook(booksId, status){
            return db.query('UPDATE books SET status = ? WHERE id = ?', [status, booksId])
        .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }

    //Suppression d'un livre
    //Requete SQL sur phpmyAdmin ok
    //Route postman ok
    static deleteOneBook(id) {
        return db.query("DELETE FROM books WHERE id = ?", [id])
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }
}
