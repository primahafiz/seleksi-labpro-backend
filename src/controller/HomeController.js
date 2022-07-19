const {Customer,RequestTransaction,TransferTransaction} = require('../models')
const CurrencyConversion = require('../utils/CurrencyConversion')

module.exports = {
    async getHomeInfo(req,res){
        var saldo = 0.0
        const reqData = await RequestTransaction.findAll({
            where : {
                Username : req.session.username
            }
        })
        for(let i=0;i<reqData.length;i++){
            saldo += await CurrencyConversion.convertToIDR(reqData[i].RequestCurrency,reqdata[i].RequestValue)
        }

        const transSendData = await TransferTransaction.findAll({
            where : {
                UsernameSender : req.session.username
            }
        })
        for(let i=0;i<transSendData.length;i++){
            saldo -= await CurrencyConversion.convertToIDR(transSendData[i].TransferCurrency,transSendData[i].TransferValue)
        }

        const transReceiveData = await TransferTransaction.findAll({
            where : {
                UsernameReceiver : req.session.username
            }
        })
        for(let i=0;i<transReceiveData.length;i++){
            saldo += await CurrencyConversion.convertToIDR(transReceiveData[i].TransferCurrency,transReceiveData[i].TransferValue)
        }

        const profile = await Customer.findAll({
            where : {
                Username : req.session.username
            }
        })

        res.send({
            name : profile[0].Name,
            saldo : saldo
        })
    }
}