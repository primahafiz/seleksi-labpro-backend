const {Sequelize,Model} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Admin extends Model {
        async verifRegistration(username,status){
          const regis = await sequelize.models.Customer.update(
            {
                IsProceed : true,
                IsAccepted : status
            },
            {
                where : {
                    Username : username,
                    IsProceed : false
                }
            }
          )
        }
        async verifRequest(IdRequest,status){
          const transaction = await sequelize.models.RequestTransaction.update(
            {
                IsProceed : true,
                IsAccepted : status
            },
            {
                where : {
                    IDRequest : IdRequest,
                    IsProceed : false
                }
            }
          )
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