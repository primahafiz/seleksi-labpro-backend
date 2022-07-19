const {Sequelize,Model} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Admin extends Model {
        async verifRegistration(username,status){
          const regis = await sequelize.models.Customer.update(
            {
                isProceed : true,
                isAccepted : status
            },
            {
                where : {
                    Username : username,
                    isProceed : false
                }
            }
          )
          return regis
        }
        async verifRequest(IdRequest,status){
          const transaction = await sequelize.models.RequestTransaction.update(
            {
                isProceed : true,
                isAccepted : status
            },
            {
                where : {
                    IDRequest : IdRequest,
                    isProceed : false
                }
            }
          )
          return transaction
        }
      }
      Admin.init({
        Username : {
          type : DataTypes.STRING,
          primaryKey : true
        },
        Password : DataTypes.STRING,
        Name : DataTypes.STRING
      }, { sequelize });
  
    return Admin
  }