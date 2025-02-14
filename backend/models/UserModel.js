const bcrypt = require("bcryptjs")
const saltRounds = 10

module.exports = (_db) => {
    db = _db
    return UserModel
}

class UserModel {

    //Sauvegarde d'un utillisateur
    static saveOneUser(req) {
        //hash password
        return bcrypt.hash(req.body.password, saltRounds)
            .then((hash) => {
                //on enregistre dans la BDD (sql)
                return db.query('INSERT INTO users (lastname, firstname, email, password, address, complement_address, zip, city, phone, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,"user", NOW())', [req.body.lastname, req.body.firstname, req.body.email, hash, req.body.address, req.body.complement_address, req.body.zip, req.body.city, req.body.phone])
                    .then((res) => {
                        return res
                    })
                    .catch((err) => {
                        return err
                    })
            })
            .catch(err => err)
    }
    
    //modification d'un utilisateur
    static updateUser(req, userId) {

        return db.query('UPDATE users SET address = ?, complement_address = ?, zip = ?, city = ?, phone = ? WHERE id = ?', [req.body.address, req.body.complement_address, req.body.zip, req.body.city, req.body.phone, userId])
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }

    //suppression d'un compte utilisateur
    static deleteOneUser(id) {
        return db.query('DELETE FROM users WHERE id = ?', [id])
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }

    //récupération de tous les utilisateurs
    static getAllUsers() {

        return db.query('SELECT id, lastname, firstname, email FROM users WHERE status = "user"')
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }

    //récupération d'un utilisateur en fonction de son email
    static getUserByEmail(email) {

        return db.query('SELECT id, lastname, firstname, email, password, address, complement_address, zip, city, phone, status FROM users WHERE email = ?', [email])
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }

    //récupération d'un utilisateur par son id
    static findOneUser(id) {
        
        return db.query('SELECT id, lastname, firstname, email, password, address, complement_address, zip, city, phone, status FROM users WHERE id = ?', [id])
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }
}
