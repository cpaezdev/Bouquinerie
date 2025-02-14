module.exports = (AuthorsBooksModel) => {

    const getAllAuthorsByBook = async (req, res) => {
        try {
            const authorsByBook = await AuthorsBooksModel.getAllAuthors(req.params.id)
            if (authorsByBook.code) {
                res.json({ status: 500, msg: " Oups, une erreur est survenue" })
            }
            else {

                if (authorsByBook.length > 0) {
                    res.json({ status: 200, result: authorsByBook })
                
                } else {
                    res.json({ status: 404, msg: "Aucun auteur trouvé pour ce livre" })
                }
            }
        }
        catch (err) {
            res.json({ status: 500, msg: " Oups, une erreur est survenue dans GAAByBo" })
        }
    }

    const getAllBooksByAuthor = async (req, res) => {
        try {
            const BookByAuthors = await AuthorsBooksModel.getAllBooks(req.params.id)
            if (BookByAuthors.code) {
                res.json({ status: 500, msg: " Oups, une erreur est survenue" })
            }
            else {
                if (BookByAuthors.length > 0) {
                    res.json({ status: 200, result: BookByAuthors })
                }
                else {
                    res.json({ status: 404, msg: "Aucun livre trouvé de cet auteur" })
                }
            }
        }
        catch (err) {
            res.json({ status: 500, msg: " Oups, une erreur est survenue dans GAAByBo" })
        }
    }

    const saveAuthorBook = async (req, res) => {
        try {
            const authorBook = await AuthorsBooksModel.saveAuthorsBooks(req)
            if (authorBook.code) {
                res.json({ status: 500, msg: " Oups, une erreur est survenue" })
            }
            else {
                res.json({ status: 200, msg: "enregistrement effectué" })
            }
        }
        catch (err) {
            res.json({ status: 500, msg: " Oups, une erreur est survenue dans SAutBoo" })
        }
    }

    const updateAuthorForBook = async (req, res) => {
        try {
            const { newAuthorsId, oldAuthorsId } = req.body
            const booksId = req.params.id
            const authorBook = await AuthorsBooksModel.updateAuthorForBook(newAuthorsId, booksId, oldAuthorsId)

            if (authorBook.code) {
                res.json({ status: 500, msg: " Oups, une erreur est survenue" })
            }
            else {
                res.json({ status: 200, msg: "L'auteur du livre a été modifié" })
            }
        }
        catch (err) {
            res.json({ status: 500, msg: " Oups, une erreur est survenue dans UAForBoo" })
        }
    }

    const delAuthorBook = async (req, res) => {
        try {
            const booksId = req.params.id
            const deleteAuthorByBook = await AuthorsBooksModel.deleteAuthorBook(booksId)

            if (deleteAuthorByBook.code) {
                res.json({ status: 500, msg: " Oups, une erreur est survenue" })
            }
            else {
                res.json({ status: 200, msg: "L'association entre l'auteur et le livre a été supprimée." })
            }
        }
        catch (err) {
            res.json({ status: 500, msg: " Oups, une erreur est survenue dans GAAByBo" })
        }
    }

    return {
        getAllAuthorsByBook,
        getAllBooksByAuthor,
        saveAuthorBook,
        updateAuthorForBook,
        delAuthorBook
    }
}
