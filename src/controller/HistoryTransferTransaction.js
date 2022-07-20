const {TransferTransaction} = require('../models')
const {Op} = require('sequelize')

module.exports = {
    async getTransferHistory(req,res){
        var page = 0
        if(req.query.page){
            page = req.query.page
        }
        const transaction = await TransferTransaction.findAll({
            where : {
                [Op.or] : [{UsernameSender : req.session.username},{UsernameReceiver : req.session.username}]
            }
        })
        var cnt = transaction.length
        var result = []
        var mnm
        if(transaction.length<page*5+4){
            mnm = transaction.length
        }else{
            mnm = page*5+5
        }
        for(let i=page*5;i<mnm;i++){
            result.push(transaction[i])
        }
        res.send({
            maxPage : (cnt/5) >> 0,
            result : result
        })
    }
}