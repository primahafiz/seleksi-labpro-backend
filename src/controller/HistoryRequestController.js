const {RequestTransaction} = require('../models')

module.exports = {
    async getRequestHistory(req,res){
        var page = 0
        if(req.query.page){
            page = req.query.page
        }
        const transaction = await RequestTransaction.findAll({
            where : {
                Username : req.session.username
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