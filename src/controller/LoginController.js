const {Admin,Customer} = require('../models')
const bcrypt = require('bcrypt')
const TokenJWT = require('../utils/TokenJWT')

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
                req.session.token = TokenJWT.getTokenAdmin()
                res.send({
                    redirectPath : '/admin'
                })
            }else{
                res.send({
                    error : 'Username and password does not match'
                })
            }
        }else if(customer.length==1){
            if(await bcrypt.compare(req.body.password,customer[0].Password)){
                req.session.username = req.body.username
                req.session.name = customer[0].Name
                req.session.token = TokenJWT.getTokenCustomer()
                res.send({
                    redirectPath : '/'
                })
            }else{
                res.send({
                    error : 'Username and password does not match'
                })
            }
        }else{
            res.send({
                error : 'Username is not valid'
            })
        }
    }
}