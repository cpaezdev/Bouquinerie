module.exports = (_db) => {
    db = _db
    return ConditionBooksModel
}

class ConditionBooksModel {

    //Récupération de toutes les conditions
    static getAllConditions() {
        return db.query("SELECT id, name FROM condition_books")
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }

    //Récupération d une condition
    static getOneCondition(id) {
        return db.query("SELECT id, name FROM condition_books WHERE id = ?", [id])
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }

    //Sauvergarde d'une condition
    static addOneCondition(req) {
        return db.query("INSERT INTO condition_books (name) VALUES (?)", [req.body.name])
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }

    //Modification d'une condition
    static updateOneCondition(req, id) {
        return db.query("UPDATE condition_books SET name = ? WHERE id = ?", [req.body.name, id])
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }

    //Suppression d'une condition
    static deleteOneCondition(id){
        return db.query("DELETE FROM condition_books WHERE id = ?", [id])
        .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }
}
