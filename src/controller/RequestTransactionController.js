const Customer = require('../models/Customer')

module.exports = {
    async reqTransaction(req,res){
        const customer = Customer.findAll({
            where : {
                Username : req.session.username
            }
        })
        const newTransaction = await customer.requestTransaction(req.body.requestValue,req.body.requestCurrency)
    }
}