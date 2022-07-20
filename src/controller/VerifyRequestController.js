const {Admin} = require('../models')

module.exports = {
    async acceptRequest(req,res){
        const admin = await Admin.findAll({
            where : {
                Username : req.session.username
            }
        })
        await admin[0].verifRequest(req.params.idrequest,true)
        res.status(200).send()
    },
    async declineRequest(req,res){
        const admin = await Admin.findAll({
            where : {
                Username : req.session.username
            }
        })
        await admin[0].verifRequest(req.params.idrequest,false)
        res.status(200).send()
    }
}