const {Admin} = require('../models')

module.exports = {
    async acceptRequest(req,res){
        const admin = Admin.findOne({
            where : {
                Username : req.session.username
            }
        })
        admin.verifRequest(req.params.idrequest,true)
    },
    async declineRequest(req,res){
        const admin = Admin.findOne({
            where : {
                Username : req.session.username
            }
        })
        admin.verifRequest(req.params.idrequest,false)
    }
}