const {Sequelize,Model} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Currency extends Model {
        
      }
      Currency.init({
        CurrencyName : {
            type : DataTypes.STRING,
            primaryKey : true,
        },
        ConvertionRatioToIDR : DataTypes.FLOAT
      }, { sequelize });
  
    return Currency
  }