module.exports = (_db) => {
    db = _db
    return CategoriesModel
}

class CategoriesModel {

    //Récupération de toutes les catégories
    static getAllCategories() {
        return db.query("SELECT id, name FROM categories")
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }
    
    //Récupération d'une catégorie
    static getOneCategory(id){
        return db.query("SELECT id, name FROM categories WHERE id = ?", [id])
        .then((res)=>{
        return res    
        })
        .catch((err) => {
            return err
        })
    }

    //sauvegarde d'une catégorie
    static addOneCategory(req) {
        return db.query("INSERT INTO categories (name) VALUE (?)", [req.body.name])
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }

    //modification d'une catégorie
    static updateOneCategory(req, id) {
        return db.query("UPDATE categories SET name = ? WHERE id = ?", [req.body.name, id])
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }

    //suppression d'une catégorie
    static deleteOneCategory(id) {
        return db.query("DELETE FROM categories WHERE id = ?", [id])
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }
}
