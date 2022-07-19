const {Admin} = require('../models')

module.exports = {
    async acceptRegistration(req,res){
        const admin = Admin.findOne({
            where : {
                Username : req.session.username
            }
        })
        admin.verifRegistration(req.params.username,true)
    },
    async declineRegistration(req,res){
        const admin = Admin.findOne({
            where : {
                Username : req.session.username
            }
        })
        admin.verifRegistration(req.params.username,false)
    }
}