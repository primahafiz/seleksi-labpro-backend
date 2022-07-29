const {Customer} = require('../models')
const Saldo = require('../utils/Saldo')

module.exports = {
    async getProfile(req,res){
        const customer = await Customer.findAll({
            where : {
                Username : req.params.username
            }
        })
        if(customer.length==0){
            return res.status(500)
        }
        const saldo = await Saldo.calcSaldo(req.params.username)
        res.send({
            data : customer[0],
            balance : saldo
        })
    }
}