const {Admin} = require('../models')

module.exports = {
    async adminHome(req,res){
        const admin = await Admin.findAll({
            where : {
                Username : req.session.username
            }
        })
        res.send({
            name : admin[0].Name
        })
    }
}