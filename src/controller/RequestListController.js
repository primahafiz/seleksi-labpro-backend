const {RequestTransaction} = require('../models')

module.exports = {
    async getAllRequest(req,res){
        const reqData = await RequestTransaction.findAll({
            where : {
                IsProceed : false
            }
        })
        res.send({
            data : reqData
        })
    }
}