const {Customer} = require('../models')
const Saldo = require('../utils/Saldo')

module.exports = {
    async getProfile(req,res){
        const customer = await Customer.findAll({
            where : {
                Username : req.session.username
            }
        })
        const saldo = await Saldo.calcSaldo(req.session.username)
        res.send({
            data : customer[0],
            balance : saldo
        })
    }
}