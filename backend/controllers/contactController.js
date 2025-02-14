module.exports = (ContactsModel) => {

    const saveContactMsg = async(req, res) => {
        try {
            const contactMsg = await ContactsModel.saveOneContactMsg(req)
            
            if (contactMsg.code) {
                res.json({ status: 500, msg: "Echec enregistrement du contactMsg" })
            }
            else {
                res.json({ status: 200, msg: "Le contactMsg enregistré" })
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Echec enregistrement du contactMsg" })
        }
    }

    const deleteContactMsg = async(req, res) => {
        try {
            const deleteContactMsg = await ContactsModel.deleteContactMsg(req.params.id)

            if (deleteContactMsg.code) {
                res.json({ status: 500, msg: "Echec, le contactMsg n'a pas pu être modifié" })
            }
            else {
                res.json({ status: 200, msg: "ContactMsg supprimé" })
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Echec de suppression du contactMsg" })
        }
    }

    const getAllContactsMsg = async(req, res) => {
        try {
            const contactMsgs = await ContactsModel.getAllContactsMsg()

            if (contactMsgs.code) {
                res.json({ status: 200, msg: "Echec, les contactMsgs n'ont pas pu être affichés" })
            }
            else {
                res.json({ status: 200, result: contactMsgs })
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Echec d'affichage de tous les contactMsg" })
        }
    }

    const getContactMsg = async(req, res) => {
        try {
            const contactMsg = await ContactsModel.getOneContactMsg(req.params.id)
            if (contactMsg.code) {
                res.json({ status: 500, msg: "Echec d'affichage du contactMsg" })
            }
            else {
                
                req.body.status = "1"

                const updateStatusContact = await ContactsModel.updateStatusContactMsg(req.params.id, req.body.status)

                if (updateStatusContact.code) {
                    res.json({ status: 500, msg: "Echec de modification du statut du contactMsg" })
                }
                res.json({ status: 200, result: contactMsg[0] })
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Echec d'affichage d'un contactMsg" })
        }
    }

    return {
        saveContactMsg,
        deleteContactMsg,
        getAllContactsMsg,
        getContactMsg
    }
}
