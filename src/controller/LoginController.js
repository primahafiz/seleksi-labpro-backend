const {Admin,Customer} = require('../models')
const bcrypt = require('bcrypt')

module.exports = {
    async login(req,res){
        const admin = await Admin.findAll({
            where : {
                Username : req.body.username
            }
        })
        const customer = await Customer.findAll({
            where : {
                Username : req.body.username,
                IsAccepted : true
            }
        })
        if(admin.length==1){
            if(await bcrypt.compare(req.body.password,admin[0].Password)){
                req.session.username = req.body.username
                req.session.name = admin[0].Name
                res.send({
                    redirectPath : '/admin'
                })
            }else{
                throw 'User is not valid'
            }
        }else if(customer.length==1){
            if(await bcrypt.compare(req.body.password,customer[0].Password)){
                req.session.username = req.body.username
                req.session.name = customer[0].Name
                res.send({
                    redirectPath : '/'
                })
            }else{
                throw 'User is not valid'
            }
        }else{
            throw 'User is not valid'
        }
    }
}