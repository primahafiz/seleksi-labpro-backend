const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')
const db = {}

const sequelize = new Sequelize('postgres://lgptzhfeeagojp:12bf903fe367ac09e6bd7e1243afeee469f17e91ae75f2a3c2cee70914339d51@ec2-3-213-228-206.compute-1.amazonaws.com:5432/d7jlmj5mgn2qme', {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    operatorAliases: false,
    timezone:"+07:00"
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

fs
  .readdirSync(__dirname)
  .filter((file) =>
    file !== 'index.js'
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model
  })

Object.keys(db).forEach(function (modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db