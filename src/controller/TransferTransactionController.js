const Customer = require('../models/Customer')

module.exports = {
    async transTransaction(req,res){
        const customer = Customer.findAll({
            where : {
                Username : req.session.username
            }
        })
        const newTransaction = await customer.transferTransaction(req.body.usernameReceiver,req.body.transferValue,req.body.transferCurrency)
    }
}