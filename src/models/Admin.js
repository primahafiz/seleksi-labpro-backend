const {Sequelize,Model} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Admin extends Model {
        static classLevelMethod() {
          return 'foo';
        }
        instanceLevelMethod() {
          return 'bar';
        }
        getFullname() {
          return [this.firstname, this.lastname].join(' ');
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