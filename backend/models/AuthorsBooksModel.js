module.exports = (_db) => {
    db = _db
    return AuthorsBooksModel
}


class AuthorsBooksModel {

    //Récupération de tous les auteurs d'un livre
    //Requete SQL sur phpmyAdmin ok
    static getAllAuthors(booksId) {
        return db.query(`SELECT 
            authors_books.authors_id, authors_books.books_id,
            authors.lastname AS aLastname, authors.firstname AS aFirstname,
            books.title
            FROM authors_books 
            LEFT JOIN authors
            ON authors_books.authors_id = authors.id
            LEFT JOIN books 
                ON books.id = authors_books.books_id 
            WHERE books_id = ?`, [booksId])
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }

    //Récupération de tous les livres d'un même auteur
    //Requete SQL sur phpmyAdmin ok
    static getAllBooks(authorsId) {
        return db.query(`SELECT 
            authors_books.books_id, authors_books.authors_id,
            books.id, books.picture, books.alt_picture, books.title, books.price, books.weight, books.status,
            authors.lastname, authors.firstname 
            FROM authors_books 
            LEFT JOIN books 
                ON books.id = authors_books.books_id 
            LEFT JOIN authors 
                ON authors_books.authors_id = authors.id 
            WHERE authors_id = ?`, [authorsId])
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }

    //sauvegarde d un auteur d un livre
    //Requete SQL sur phpmyAdmin ok
    static saveAuthorsBooks(req) {

        return db.query("INSERT INTO authors_books (books_id, authors_id) VALUES (?, ?)", [req.body.books_id, req.body.authors_id])
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }
    
    //Suppression de l association livre-auteur
    //Requete SQL sur phpmyAdmin ok
    static deleteAuthorBook(booksId) {
        return db.query("DELETE FROM authors_books WHERE books_id = ?", [booksId])
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }
}
