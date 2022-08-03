const {RequestTransaction} = require('../models')
const FormatDate = require('../utils/FormatDate')

module.exports = {
    async getAllRequest(req,res){
        const reqData = await RequestTransaction.findAll({
            where : {
                IsProceed : false
            }
        })
        for(let i=0;i<reqData.length;i++){
            reqData[i].dataValues.formattedDate = FormatDate.formatDate(reqData[i].createdAt)
        }
        res.send({
            data : reqData
        })
    }
}