const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const fileType = require('file-type')


module.exports = (BooksModel) => {

    const getAllBooks = async(req, res) => {
        try {
            const books = await BooksModel.getAllBooks()
            if (books.code) {
                res.json({ status: 500, msg: " Oups, une erreur est survenue" })
            }
            else {
                res.json({ status: 200, result: books })
            }
        }
        catch (err) {
            res.json({ status: 500, msg: " Oups, une erreur est survenue dans GAB" })
        }
    }

    const getOneBook = async(req, res) => {
        try {
            const book = await BooksModel.getOneBook(req.params.id)
            if (book.code) {
                res.json({ status: 500, msg: " Oups, une erreur est survenue" })
            }
            else {
                res.json({ status: 200, result: book[0] })
            }
        }
        catch (err) {
            res.json({ status: 500, msg: " Oups, une erreur est survenue dans GOB" })
        }
    }

    const getLastBooks = async(req, res) => {
        try {
            const fourLast = await BooksModel.getLastFourBooks()
            if (fourLast.code) {
                res.json({ status: 500, msg: " Oups, une erreur est survenue" })
            }
            else {
                res.json({ status: 200, result: fourLast })
            }
        }
        catch (err) {
            res.json({ status: 500, msg: " Oups, une erreur est survenue dans GL4B" })
        }
    }

    const getBooksByCategory = async(req, res) => {
        try {
            const categoryId = req.params.id
            const booksByCat = await BooksModel.getAllBooksOneCat(req.params.id)
            if (booksByCat.code) {
                res.json({ status: 500, msg: " Oups, une erreur est survenue" })
            }
            else {
                if (booksByCat.length === 0) {
                    res.json({ status: 404, msg: "Aucun livre trouvé dans cette catégorie" })
                }
                else {
                    res.json({ status: 200, result: booksByCat })
                }
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Oups, une erreur est survenue dans BBBC" })
        }
    }

    const getBooksByCondition = async(req, res) => {
        try {
            const conditionbooksId = req.params.id
            const booksByCond = await BooksModel.getAllBooksOneCond(req.params.id)
            if (booksByCond.code) {
                res.json({ status: 500, msg: " Oups, une erreur est survenue" })
            }
            else {
                if (booksByCond.length === 0) {
                    res.json({ status: 404, msg: "Aucun livre trouvé dans cet état" })
                }
                else {
                    res.json({ status: 200, result: booksByCond })
                }
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Oups, une erreur est survenue dans GBBC" })
        }
    }

    const saveBook = async(req, res) => {

        try {
            const book = await BooksModel.saveOneBook(req)
            if (book.code) {
                res.json({ status: 500, msg: " Oups, une erreur est survenue" })
            }
            else {
                res.json({ status: 200, msg: "Livre enregistré" })
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Oups, une erreur est survenue dans SB" })
        }
    }

    const updateBook = async(req, res) => {
        try {
            const book = await BooksModel.updateOneBook(req, req.params.id)
            if (book.code) {
                res.json({ status: 500, msg: "Oups, une erreur est survenue!" })
            }
            else {
                res.json({ status: 200, msg: "Livre modifié" })
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Oups, une erreur est survenue dans UB" })
        }

    }

    const deleteBook = async(req, res) => {
        try {
            const book = await BooksModel.getOneBook(req.params.id) 
              //  console.log('Bookget', book)
            if (book.code) {
                res.json({ status: 500, msg: "Oups, une erreur est survenue!" })
            }
            else {
                const deleteOneBook = await BooksModel.deleteOneBook(req.params.id)
                if (deleteOneBook.code) {
                    res.json({ status: 500, msg: "Oups, une erreur est survenue" })
                }
                else {
                    if (book[0].picture !== "no-pict.webp") {
                        fs.unlink(`public/images/${book[0].picture}`, (err) => {
                            if (err) {
                                res.json({ status: 500, msg: "Problème de suppression de l'image!" })
                            }
                            else {
                                res.json({ status: 200, msg: "Image supprimée" })
                            }
                        })
                    }
                    else {
                        res.json({ status: 200, msg: "Livre supprimé" })
                    }
                }
            }
        }
        catch (err) {
            res.json({ status: 500, msg: "Oups, une erreur est survenue dans DB" })
        }
    }

    const savePicture = async(req, res) => {
        try {
            // Vérifier si un fichier a été envoyé
            if (!req.files || Object.keys(req.files).length === 0) {
                return res.json({ status: 400, msg: "La photo n'a pas pu être récupérée" })
            }

            const image = req.files.image
            // Vérification de la taille de l'image (taille maximale de 2 Mo)
            const maxSize = 2 * 1024 * 1024 // 2 Mo en octets
            if (image.size > maxSize) {
                return res.json({ status: 400, msg: "La taille de l'image ne doit pas dépasser 1 Mo" })
            }

            // Vérification de l'extension du fichier
            const allowedExtensions = ['.webp', '.jpg', '.jpeg', '.png']
            const fileExtension = path.extname(image.name).toLowerCase()
            if (!allowedExtensions.includes(fileExtension)) {
                return res.json({ status: 400, msg: "L'extension du fichier doit être .webp, .jpg, .jpeg, ou .png" })
            }

            // Vérification du contenu du fichier (doit être une image)
            const type = await fileType.fromBuffer(image.data);
            if (!type || !['image/jpeg', 'image/png', 'image/webp'].includes(type.mime)) {
                return res.json({ status: 400, msg: "Le fichier n'est pas une image valide" });
            }

            // Renommer le fichier de façon unique avec uuid et un timestamp
            const newFileName = `${uuidv4()}_${Date.now()}${fileExtension}`

            // Envoi de l'image vers le dossier public/images
            const uploadPath = path.join('public/images', newFileName)
            image.mv(uploadPath, (err) => {
                if (err) {
                    return res.json({ status: 500, msg: "La photo n'a pas pu être enregistrée!" })
                }
                else {
                    return res.json({ status: 200, msg: "Image enregistrée", url: newFileName })
                }
            })
        }
        catch (err) {
            return res.json({ status: 500, msg: "Oups, une erreur est survenue!" })
        }
    }

    return {
        getAllBooks,
        getOneBook,
        getLastBooks,
        getBooksByCategory,
        getBooksByCondition,
        saveBook,
        updateBook,
        deleteBook,
        savePicture
    }
}
