const {Currency} = require('../models')

module.exports = {
    async getListCurrency(req,res){
        const currency = await Currency.findAll({
            attributes : CurrencyName
        })
        res.send({
            currency : currency
        })
    }
}