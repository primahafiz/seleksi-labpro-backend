const {Admin} = require('../models')

module.exports = {
    async acceptRegistration(req,res){
        const admin = await Admin.findOne({
            where : {
                Username : req.session.username
            }
        })
        admin.verifRegistration(req.params.username,true)
        res.status(200).send()
    },
    async declineRegistration(req,res){
        const admin = await Admin.findOne({
            where : {
                Username : req.session.username
            }
        })
        admin.verifRegistration(req.params.username,false)
        res.status(200).send()
    }
}