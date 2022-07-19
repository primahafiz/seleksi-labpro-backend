const {Sequelize,Model} = require('sequelize')
const Customer = require('./Customer')
const RequestTransaction = require('./RequestTransaction')

module.exports = (sequelize, DataTypes) => {
    class Admin extends Model {
        async verifRegistration(username,status){
          const regis = await Customer.update(
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
          const trasaction = await Request.update(
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
          return trasaction
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