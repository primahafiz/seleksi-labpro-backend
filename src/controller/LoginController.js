const Admin = require('../models/Admin')
const Customer = require('../models/Customer')
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
                return res.redirect('/admin')
            }else{
                res.send({
                    error : 'User is not valid'
                })
            }
        }else if(customer.length==1){
            if(await bcrypt.compare(req.body.password,customer[0].Password)){
                req.session.username = req.body.username
                return res.redirect('/')
            }else{
                res.send({
                    error : 'User is not valid'
                })
            }
        }else{
            res.send({
                error : 'User is not valid'
            })
        }
    }
}