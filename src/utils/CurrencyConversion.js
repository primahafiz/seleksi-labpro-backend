const {Currency} = require('../models')

module.exports = {
    async convertToIDR(currencyType,num){
        const currency = await Currency.findAll({
            where : {
                CurrencyName : currencyType
            }
        })

        const res = currency[0].ConvertionRatioToIDR * num

        return res
    }
}