const {Customer,Currency} = require('../models')
const Saldo = require('../utils/Saldo')

module.exports = {
    async checkReceiver(req,res,next){
        console.log(req.body)
        if(req.body.usernameReceiver == req.session.username){
            return res.send({
                error : 'Receiver cannot be yourself'
            })
        }
        const customer = await Customer.findAll({
            where : {
                Username : req.body.usernameReceiver
            }
        })
        if(customer.length==0){
            console.log('error gan')
            res.send({
                error : 'Receiver is not a valid username'
            })
        }else{
            const currency = await Currency.findAll({
                where : {
                    CurrencyName : req.body.transferCurrency
                }
            })
            const amount = req.body.transferValue * currency[0].ConvertionRatioToIDR
            const currentBalance = await Saldo.calcSaldo(req.session.username)
            if(amount > currentBalance){
                return res.send({
                    error : 'Transfer amount cannot be greater than your balance'
                })
            }else{
                next()
            }
        }
    }
}