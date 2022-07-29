const Saldo = require('../utils/Saldo')

module.exports = {
    async getHomeInfo(req,res){
        const saldo = await Saldo.calcSaldo(req.session.username)

        res.send({
            name : req.session.name,
            saldo : saldo
        })
    }
}