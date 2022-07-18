const TransferTransaction = require('../models/TransferTransaction')

module.exports = {
    async getTransferHistory(req,res){
        var page = 0
        if(req.query.page){
            page = req.query.page
        }
        const transaction = await TransferTransaction.findAll({
            where : {
                Username : req.session.username
            }
        })
        var cnt = transaction.length
        var result = []
        for(let i=page*5;i<transaction.length;i++){
            result.push(transaction[i])
        }
        res.send({
            maxPage : (cnt/5) >> 0,
            result : result
        })
    }
}