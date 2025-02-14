module.exports = (_db) => {
    db = _db
    return ContactsModel
}

class ContactsModel {

    //Requete SQL sur phpmyAdmin ok
    static saveOneContactMsg(req) {
        return db.query('INSERT INTO contacts (email, subject, story, receipt_date) VALUES (?, ?, ?, NOW())', [req.body.email, req.body.subject, req.body.story])
            .then((res) => {
                return res
            })
            .catch((err) => {
                return err
            })
    }

    //Requete SQL sur phpmyAdmin ok
    static updateStatusContactMsg(id, status) {
        return db.query('UPDATE contacts SET status = ? WHERE id =?', [status, id])
            .then((res) => {
                return res
            }).catch((err) => {
                return err
            })
    }

    //Requete SQL sur phpmyAdmin ok
    static deleteContactMsg(id) {
        return db.query('DELETE FROM contacts WHERE id = ?', [id])
            .then((res) => {
                return res
            }).catch((err) => {
                return err
            })
    }

    //Requete SQL sur phpmyAdmin ok
    static getAllContactsMsg() {
        return db.query('SELECT id, email, subject, receipt_date, status FROM contacts ORDER BY id DESC')
            .then((res) => {
                return res
            }).catch((err) => {
                return err
            })
    }

    //Requete SQL sur phpmyAdmin ok
    static getOneContactMsg(id) {
        return db.query('SELECT id, email, subject, story, receipt_date, status FROM contacts WHERE id = ?', [id])
            .then((res) => {
                return res
            }).catch((err) => {
                return err
            })
    }

}
