const {Sequelize,Model} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class RequestTransaction extends Model {
        
      }
      RequestTransaction.init({
        IDRequest : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        Username : {
            type : DataTypes.STRING,
            references : {
                model : 'Admins',
                key : 'Username'
            }
        },
        RequestValue : DataTypes.FLOAT,
        RequestCurrency : DataTypes.STRING,
        IsProceed : DataTypes.BOOLEAN,
        IsAccepted : DataTypes.BOOLEAN
      }, { sequelize });
  
    return RequestTransaction
  }