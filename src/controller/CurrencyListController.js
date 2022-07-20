const {Currency} = require('../models')

module.exports = {
    async getListCurrency(req,res){
        const currency = await Currency.findAll({
            attributes : ['CurrencyName']
        })
        const ans = []
        for(let i=0;i<currency.length;i++){
            ans.push(currency[i].CurrencyName)
        }
        res.send({
            currency : ans
        })
    }
}