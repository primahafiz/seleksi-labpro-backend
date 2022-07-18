const {Sequelize,Model} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class TransferTransaction extends Model {
        
      }
      TransferTransaction.init({
        IDTransfer : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        UsernameSender : {
            type : DataTypes.STRING,
            references : {
                model : 'Admins',
                key : 'Username'
            }
        },
        UsernameReceiver : {
            type : DataTypes.STRING,
            references : {
                model : 'Admins',
                key : 'Username'
            }
        },
        TransferValue : DataTypes.FLOAT,
        TransferCurrency : DataTypes.STRING,
      }, { sequelize });
  
    return TransferTransaction
  }