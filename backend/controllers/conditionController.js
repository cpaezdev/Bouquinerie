module.exports = (ConditionBooksModel) => {

    const getAllConditions = async(req, res) => {
        try {
            const conditions = await ConditionBooksModel.getAllConditions()
            if (conditions.code) {
                res.json({ status: 500, msg: " Oups, une erreur est survenue"})
            }
            else {
                res.json({ status: 200, result: conditions})
            }
        }
        catch (err) {
            res.json({ status: 500, msg: " Oups, une erreur est survenue dans GACo"})
        }
    }
    
    const getCondition = async (req, res) => {
        try{
            const condition = await ConditionBooksModel.getOneCondition(req.params.id)
            if(condition.code){
                res.json({ status: 500, msg: " Oups, une erreur est survenue"})
            }else{
                res.json({status: 200, result: condition[0]})
            }
            
        }catch(err){
            res.json({ status: 500, msg: " Oups, une erreur est survenue dans GCo"})
        }
    }
    
    const saveCondition = async (req, res) =>{
        try{
            const condition = await ConditionBooksModel.addOneCondition(req)
            
            if(condition.code){
                res.json({ status: 500, msg: " Oups, une erreur est survenue"})
            }else{
                res.json({status: 200, msg: "Condition a bien été enregistrée"})
            }
        }catch(err){
            res.json({ status: 500, msg: " Oups, une erreur est survenue dans SCo"})
        }
    }
    
    const updateCondition = async (req, res) =>{
        try{
            const condition = await ConditionBooksModel.updateOneCondition(req, req.params.id)
            
            if(condition.code){
                res.json({ status: 500, msg: " Oups, une erreur est survenue"})
            }else{
                res.json({status: 200, msg: "Condition a bien été modifiée"})
            }
        }catch(err){
            res.json({ status: 500, msg: " Oups, une erreur est survenue dans UCo"})
        }
    }
    
    const deleteCondition = async (req, res) =>{
        try{
            const deletecondition = await ConditionBooksModel.deleteOneCondition(req.params.id)
            
            if(deletecondition.code){
                res.json({ status: 500, msg: " Oups, une erreur est survenue"})
            }else{
                res.json({status: 200, msg: "Condition a bien été supprimée"})
            }
        }catch(err){
            res.json({ status: 500, msg: " Oups, une erreur est survenue dans DCo"})
        }
    }

    return {
        getAllConditions,
        getCondition,
        saveCondition,
        updateCondition,
        deleteCondition
    }
}
