module.exports = (_db) => {
    db = _db
    return AuthorsModel
}

class AuthorsModel {

    //Récupération de tous les auteurs
    static getAllAuthors() {
        return db.query("SELECT id, lastname, firstname FROM authors ORDER BY lastname ASC, firstname ASC")
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }
    
    //Récupération d un auteur
    static getOneAuthor(id) {
        return db.query("SELECT id, lastname, firstname FROM authors WHERE id = ?", [id])
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }   

    //sauvegarde d'un auteur
    static saveOneAuthor(req) {
        return db.query("INSERT INTO authors (lastname, firstname) VALUES (?, ?)", [req.body.lastname, req.body.firstname])
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }
    
    
    //modification d'un auteur
    static updateOneAuthor(req, id) {
        return db.query("UPDATE authors SET lastname = ?, firstname = ? WHERE id = ?", [req.body.lastname, req.body.firstname, id])
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }

    static deleteOneAuthor(id) {
        return db.query("DELETE FROM authors WHERE id = ?", [id])
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }

}
