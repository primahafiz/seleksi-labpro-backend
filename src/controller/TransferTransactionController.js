const {Customer} = require('../models')
const Saldo = require('../utils/Saldo')

module.exports = {
    async transTransaction(req,res){
        const customer = await Customer.findAll({
            where : {
                Username : req.session.username
            }
        })
        console.log(req.body)
        const newTransaction = await customer[0].transferTransaction(req.body.usernameReceiver,req.body.transferValue,req.body.transferCurrency)
        res.status(200).send()
    }
}