const {Customer} = require('../models')

module.exports = {
    async reqTransaction(req,res){
        const customer = await Customer.findAll({
            where : {
                Username : req.session.username
            }
        })
        console.log(customer)
        const newTransaction = await customer[0].requestTransaction(req.body.requestValue,req.body.requestCurrency)
        res.status(200).send()
    }
}