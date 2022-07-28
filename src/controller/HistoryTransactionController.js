const {RequestTransaction, TransferTransaction} = require('../models')
const FormatDate = require('../utils/FormatDate')

module.exports = {
    async getTransactionHistory(req,res){
        var page = 1
        if(req.query.page){
            page = parseInt(req.query.page,10)
        }
        const ans = []
        const request = await RequestTransaction.findAll({
            where : {
                Username : req.session.username
            }
        })
        for(let i=0;i<request.length;i++){
            request[i].dataValues.TypeTransaction = 'request'
            request[i].dataValues.createdAt = FormatDate.formatDate(request[i].createdAt)
            ans.push(request[i])
        }
        const transferSend = await TransferTransaction.findAll({
            where : {
                UsernameSender : req.session.username
            }
        })
        for(let i=0;i<transferSend.length;i++){
            transferSend[i].dataValues.TypeTransaction = 'transferSend'
            transferSend[i].dataValues.createdAt = FormatDate.formatDate(transferSend[i].createdAt)
            ans.push(transferSend[i])
        } 
        const transferReceive = await TransferTransaction.findAll({
            where : {
                UsernameReceiver : req.session.username
            }
        })
        for(let i=0;i<transferReceive.length;i++){
            transferReceive[i].dataValues.TypeTransaction = 'transferReceive'
            transferReceive[i].dataValues.createdAt = FormatDate.formatDate(transferReceive[i].createdAt)
            ans.push(transferReceive[i])
        }
        ans.sort((a,b) => (a.createdAt > b.createdAt) ? -1 : ((b.createdAt > a.createdAt) ? 1 : 0))
        for(let i=0;i<ans.length;i++){
        }
        var maxPage = (ans.length/5) << 0
        if(ans.length%5!=0){
            maxPage++
        }
        const result = []
        var mxm = page*5
        if(mxm>ans.length){
            mxm = ans.length
        }
        for(let i=(page-1)*5;i<mxm;i++){
            result.push(ans[i])
        }
        console.log(page)
        res.send({
            maxPage : maxPage,
            username : req.session.username,
            ans : result
        })
    }
}