const {Sequelize,Model} = require('sequelize')
const RequestTransaction = require('./RequestTransaction')
const TransferTransaction = require('./TransferTransaction')

module.exports = (sequelize, DataTypes) => {
    class Customer extends Model {
        async requestTransaction(requestValue, requestCurrency){
          const transaction = await RequestTransaction.create({
            Username : this.Username,
            RequestValue : requestValue,
            RequestCurrency : requestCurrency,
            IsProceed : false,
            IsAccepted : false
          })
          return transaction
        }

        async transferTransaction(usernameReceiver,transferValue, transferCurrency){
          const transaction = await TransferTransaction.create({
            UsernameSender : this.Username,
            usernameReceiver : usernameReceiver,
            TransferValue : transferValue,
            TransferCurrency : transferCurrency
          })
          return transaction
        }
      }
      Customer.init({
        Username : {
          type : DataTypes.STRING,
          primaryKey : true
        },
        Password : DataTypes.STRING,
        Name : DataTypes.STRING,
        Photo : DataTypes.TEXT,
        IsProceed : DataTypes.BOOLEAN,
        IsAccepted : DataTypes.BOOLEAN
      }, { sequelize });
  
    return Customer
  }