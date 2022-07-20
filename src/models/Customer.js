const {Sequelize,Model} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Customer extends Model {
        async requestTransaction(requestValue, requestCurrency){
          const transaction = await sequelize.models.RequestTransaction.create({
            Username : this.Username,
            RequestValue : requestValue,
            RequestCurrency : requestCurrency,
            IsProceed : false,
            IsAccepted : false
          })
          return transaction
        }

        async transferTransaction(usernameReceiver,transferValue, transferCurrency){
          const transaction = await sequelize.models.TransferTransaction.create({
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
        Photo : DataTypes.STRING,
        IsProceed : DataTypes.BOOLEAN,
        IsAccepted : DataTypes.BOOLEAN
      }, { sequelize });
  
    return Customer
  }