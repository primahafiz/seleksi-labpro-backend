const {Customer} = require('../models')

module.exports = {
    async checkReceiver(req,res,next){
        console.log(req.body)
        if(req.body.usernameReceiver == req.session.username){
            return res.send({
                error : 'Receiver cannot be yourself'
            })
        }
        const customer = await Customer.findAll({
            where : {
                Username : req.body.usernameReceiver
            }
        })
        if(customer.length==0){
            console.log('error gan')
            res.send({
                error : 'Receiver is not a valid username'
            })
        }else{
            next()
        }
    }
}