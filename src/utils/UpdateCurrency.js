const request = require('request')
const {Currency} = require('../models')

module.exports = {
    async updateCurrency(){
        var options = {
            method: 'GET',
            json : true,
            url: 'https://api.apilayer.com/exchangerates_data/latest',
            qs: {base : 'IDR'},
            headers: {
              'apikey': 'WycissNZbZLSp9Vp3XXJGVC6vXBcB9rN',
            }
        };
        request(options, async function (error, response, body) {
            if (error)
                throw new Error(error)
            
            for(var cur in body.rates){
                const isExist = await Currency.findAll({
                    where : {
                        CurrencyName : cur
                    }
                })
                if(isExist.length==0){
                    const newCur = await Currency.create({
                        CurrencyName : cur,
                        ConvertionRatioToIDR : 1/body.rates[cur]
                    })
                }else{
                    const newCur = await Currency.update(
                        {
                            ConvertionRatioToIDR : 1/body.rates[cur]
                        },
                        {
                            where : {
                                CurrencyName : cur,
                            }
                        }
                    )
                }
            }    
        })
    }
}