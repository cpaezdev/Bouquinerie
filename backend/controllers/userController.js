const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const secret = process.env.SECRET_KEY

module.exports = (UserModel) => {

    const saveUser = async(req, res) => {
        try {

            const check = await UserModel.getUserByEmail(req.body.email)

            if (check.code) {
                res.json({ status: 500, msg: "Oups, une erreur du check est survenue" })
            }
            else {
                if (check.length > 0) {
                    if (check[0].email === req.body.email) {
                        res.json({ status: 401, msg: "Vous ne pouvez pas créer de compte avec ces identifiants" })
                    }
                }
                else {
                    const user = await UserModel.saveOneUser(req)
                    if (user.code) {
                        res.json({ status: 500, msg: "Oups, une erreur user est survenue" })
                    }
                    else {
                        res.json({ status: 200, msg: "L'utilisateur a bien été enregistré" })
                    }
                }
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Oups, une erreur est survenue" })
        }
    }

    const loginUser = async(req, res) => {
        try {
            //on vérifie si un utilisateur dans la bdd possède un compte pour cet email
            const check = await UserModel.getUserByEmail(req.body.email)

            if (check.code) {
                res.json({ status: 500, msg: "Oups, une erreur est survenue!" })
            }
            else {
                if (check.length === 0) {
                    res.json({ status: 404, msg: "Utilisateur introuvable" })
                }
                else {

                    const same = await bcrypt.compare(req.body.password, check[0].password)

                    if (same) {
                        //on crée le payload (contenu qu'on va glisser dans le token... ATTENTION, PAS D'INFOS SENSIBLES!)
                        const payload = { id: check[0].id, status: check[0].status }
                        //on crée notre token avec la signature (secret)
                        const token = jwt.sign(payload, secret)

                        const user = {
                            id: check[0].id,
                            lastname: check[0].lastname,
                            firstname: check[0].firstname,
                            email: check[0].email,
                            address: check[0].address,
                            complement_address: check[0].complement_address,
                            zip: check[0].zip,
                            city: check[0].city,
                            phone: check[0].phone,
                            status: check[0].status
                        }
                        res.json({ status: 200, token: token, user: user })
                    }
                    else {
                        res.json({ status: 404, msg: "Utilisateur introuvable" })
                    }
                }
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Oups, une erreur est survenue" })
        }
    }

    const updateUser = async(req, res) => {
        try {
            const user = await UserModel.updateUser(req, req.params.id)

            if (user.code) {
                res.json({ status: 500, msg: "Erreur mise à jour de l'utilisateur" })
            }
            else {
                //mon profil a bien été modifié, je renvoies les infos de mises à jour vers le front.
                const newUser = await UserModel.findOneUser(req.params.id)

                if (newUser.code) {
                    res.json({ status: 500, msg: "Oups, une erreur est survenue!" })
                }
                else {
                    const myUser = {
                        id: newUser[0].id,
                        address: newUser[0].address,
                        complement_address: newUser[0].complement_address,
                        zip: newUser[0].zip,
                        city: newUser[0].city,
                        phone: newUser[0].phone,
                        status: newUser[0].status
                    }
                    res.json({ status: 200, msg: "Modification effectuée." })
                }
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Oups, une erreur est survenue" })
        }
    }

    const deleteUser = async(req, res) => {
        try {
            const deleteUser = await UserModel.deleteOneUser(req.params.id)

            if (deleteUser.code) {
                res.json({ status: 500, msg: "Oups, une erreur est survenue" })
            }
            else {
                res.json({ status: 200, msg: "Utilisateur supprimé" })
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Oups, une erreur est survenue" })
        }
    }

    const getAllUsers = async(req, res) => {
        try {
            const allUsers = await UserModel.getAllUsers()

            if (allUsers.code) {
                res.json({ status: 500, msg: "Echec d'affichage des utilisateurs" })
            }
            else {
                res.json({ status: 200, result : allUsers })
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Echec d'affichage des utilisateurs" })
        }
    }

    const getOneUser = async(req, res) => {
        try {
            const user = await UserModel.findOneUser(req.params.id)

            if (user.code) {
                res.json({ status: 500, msg: "Echec d'affichage de l'utilisateur" })
            }
            else {
                res.json({ status: 200, user: user })
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Echec d'affichage de l'utilisateur" })
        }
    }

    return {
        saveUser,
        loginUser,
        updateUser,
        deleteUser,
        getAllUsers,
        getOneUser
    }
}
