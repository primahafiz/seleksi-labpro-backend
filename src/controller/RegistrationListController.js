const {Customer} = require('../models')

module.exports = {
    async getAllCustomer(req,res){
        const customer = await Customer.findAll({
            where : {
                IsProceed : false
            }
        })
        res.send({
            data : customer
        })
    }
}