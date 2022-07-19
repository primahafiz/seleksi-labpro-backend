const {sequelize} = require('../models')
const {Customer} = require('../models')
const fs = require('fs')
const bcrypt = require('bcrypt')

module.exports = {
    async registerCustomer(req,res){
        try{
            const base64Photo = fs.readdirSync(req.body.photo,{encoding:'base64'})
            const hashedPassword = await bcrypt.hash(req.body.password,10)
            const newCustomer = await Customer.create({
                Username : req.body.username,
                Password : hashedPassword,
                Name : req.body.name,
                Photo : base64Photo,
                IsProceed : false,
                IsAccepted : false
            })
        }catch(err){
            res.send({
                error : 'Username already exists'
            })
        }
    }
}