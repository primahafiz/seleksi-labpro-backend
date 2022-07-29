const {RequestTransaction,TransferTransaction} = require('../models')
const CurrencyConversion = require('./CurrencyConversion')

module.exports = {
    async calcSaldo(username){
        var saldo = 0.0
        const reqData = await RequestTransaction.findAll({
            where : {
                IsAccepted : true,
                Username : username
            }
        })
        for(let i=0;i<reqData.length;i++){
            saldo += await CurrencyConversion.convertToIDR(reqData[i].RequestCurrency,reqData[i].RequestValue)
        }

        const transSendData = await TransferTransaction.findAll({
            where : {
                UsernameSender : username
            }
        })
        for(let i=0;i<transSendData.length;i++){
            saldo -= await CurrencyConversion.convertToIDR(transSendData[i].TransferCurrency,transSendData[i].TransferValue)
        }

        const transReceiveData = await TransferTransaction.findAll({
            where : {
                UsernameReceiver : username
            }
        })
        for(let i=0;i<transReceiveData.length;i++){
            saldo += await CurrencyConversion.convertToIDR(transReceiveData[i].TransferCurrency,transReceiveData[i].TransferValue)
        }

        return saldo
    }
}