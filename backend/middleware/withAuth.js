const jwt = require("jsonwebtoken")
const secret = process.env.SECRET_KEY

const withAuth = (req, res, next) => {

    //Récupèration token dans le header de la requète HTTP (ajax)
    const token = req.headers['x-access-token']
    console.log("HEADERS", req.headers)
    console.log("TOKEN", token)
    if (token === undefined) {
        res.json({ status: 404, msg: "Erreur, token introuvable" })
    }
    else {
        //utilisation de la fonction de vérification de jsonwebtoken
        jwt.verify(token, secret, (err, decoded) => {
            //  console.log('decoded', decoded)
            if (err) {
                res.json({status: 401, msg: "Erreur, token invalide"})
            }
            else {
                console.log("Token décodé:", decoded)
                //on rajoute la propriété id dans l'objet req, qui va nous permettre de récupérer les infos de l'utilisateur à reconnecter
                req.id = decoded.id
                console.log('REQ', req.id)

                //on sort de la fonction, on autorise l'accés à la callback de la route protégée.
                next()
            }
        })
    }
}

module.exports = withAuth
