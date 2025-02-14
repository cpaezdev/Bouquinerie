module.exports = (UserModel) => {

    const checkToken = async(req, res) => {
        
        try {
        
        const user = await UserModel.findOneUser(req.id)

            if (user.code) {
                res.json({ status: 500, msg: "Oups, une erreur est survenue" })
            }
            else {
                const myUser = {
                    id: user[0].id,
                    lastname: user[0].lastname,
                    firstname: user[0].firstname,
                    email: user[0].email,
                    address: user[0].address,
                    complement_address: user[0].complement_address,
                    zip: user[0].zip,
                    city: user[0].city,
                    phone: user[0].phone,
                    status: user[0].status
                }
                res.json({ status: 200, user: myUser })
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Oups, une erreur est survenue" })
        }
    }
    return {
        checkToken
    }
}
