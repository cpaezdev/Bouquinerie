module.exports = (AuthorsModel) => {

    const getAllAuthors = async(req, res) => {
        try {
            const authors = await AuthorsModel.getAllAuthors()
            if (authors.code) {
                res.json({ status: 500, msg: " Oups, une erreur est survenue"})
            }
            else {
                res.json({ status: 200, result: authors})
            }
        }
        catch (err) {
            res.json({ status: 500, msg: " Oups, une erreur est survenue dans GAA"})
        }
    }
    
    const getAuthor = async (req, res) => {
        try{
            const author = await AuthorsModel.getOneAuthor(req.params.id)
            if(author.code){
                res.json({ status: 500, msg: " Oups, une erreur est survenue"})
            }else{
                res.json({status: 200, result: author[0]})
            }
            
        }catch(err){
            res.json({ status: 500, msg: " Oups, une erreur est survenue dans GOA"})
        }
    }
    
    const saveAuthor = async (req, res) =>{
        try{
            const author = await AuthorsModel.saveOneAuthor(req)
            
            if(author.code){
                res.json({ status: 500, msg: " Oups, une erreur est survenue"})
            }else{
                res.json({status: 200, msg: "L'auteur a bien été enregistré"})
            }
        }catch(err){
            res.json({ status: 500, msg: " Oups, une erreur est survenue dans SA"})
        }
    }
    
    const updateAuthor = async (req, res) =>{
        try{
            const author = await AuthorsModel.updateOneAuthor(req, req.params.id)
            
            if(author.code){
                res.json({ status: 500, msg: " Oups, une erreur est survenue"})
            }else{
                res.json({status: 200, msg: "L'auteur a bien été modifié"})
            }
        }catch(err){
            res.json({ status: 500, msg: " Oups, une erreur est survenue dans UA"})
        }
    }
    
    const deleteAuthor = async (req, res) =>{
        try{
            const deleteAuthor = await AuthorsModel.deleteOneAuthor(req.params.id)
            
            if(deleteAuthor.code){
                res.json({ status: 500, msg: " Oups, une erreur est survenue"})
            }else{
                res.json({status: 200, msg: "L'auteur a bien été supprimé"})
            }
        }catch(err){
            res.json({ status: 500, msg: " Oups, une erreur est survenue dans DA"})
        }
    }

    return {
        getAllAuthors,
        getAuthor,
        saveAuthor,
        updateAuthor,
        deleteAuthor
    }
}
