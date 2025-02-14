module.exports = (CategoriesModel) => {

    const getAllCategories = async(req, res) => {
        try {
            const categories = await CategoriesModel.getAllCategories()
            if (categories.code) {
                res.json({ status: 500, msg: " Oups, une erreur est survenue"})
            }
            else {
                res.json({ status: 200, result: categories})
            }
        }
        catch (err) {
            res.json({ status: 500, msg: " Oups, une erreur est survenue dans GACat"})
        }
    }
    
    const getOneCategory = async (req, res) => {
        try{
            const category = await CategoriesModel.getOneCategory(req.params.id)
            if(category.code){
                res.json({ status: 500, msg: " Oups, une erreur est survenue"})
            }else{
                res.json({status: 200, result: category[0]})
            }
            
        }catch(err){
            res.json({ status: 500, msg: " Oups, une erreur est survenue dans GOCat"})
        }
    }
    
    const saveCategory = async (req, res) =>{
        try{
            const category = await CategoriesModel.addOneCategory(req)
            
            if(category.code){
                res.json({ status: 500, msg: " Oups, une erreur est survenue"})
            }else{
                res.json({status: 200, msg: "La catégorie a bien été enregistrée"})
            }
        }catch(err){
            res.json({ status: 500, msg: " Oups, une erreur est survenue dans SCat"})
        }
    }
    
    const updateCategory = async (req, res) =>{
        try{
            const category = await CategoriesModel.updateOneCategory(req, req.params.id)
            
            if(category.code){
                res.json({ status: 500, msg: " Oups, une erreur est survenue"})
            }else{
                res.json({status: 200, msg: "La catégorie a bien été modifiée"})
            }
        }catch(err){
            res.json({ status: 500, msg: " Oups, une erreur est survenue dans UCat"})
        }
    }
    
    const deleteCategory = async (req, res) =>{
        try{
            const deleteCategory = await CategoriesModel.deleteOneCategory(req.params.id)
            
            if(deleteCategory.code){
                res.json({ status: 500, msg: " Oups, une erreur est survenue"})
            }else{
                res.json({status: 200, msg: "La catégorie a bien été supprimée"})
            }
        }catch(err){
            res.json({ status: 500, msg: " Oups, une erreur est survenue dans DCat"})
        }
    }

    return {
        getAllCategories,
        getOneCategory,
        saveCategory,
        updateCategory,
        deleteCategory
    }
}
