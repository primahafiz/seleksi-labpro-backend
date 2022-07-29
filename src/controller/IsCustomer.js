const TokenJWT = require('../utils/TokenJWT')

module.exports = {
    isCustomer(req,res){
        if(req.session.username && req.session.token){
            if(TokenJWT.isTokenAdmin(req.session.token)){
                res.send({
                    illegalAccessRedirect : '/admin'
                })
            }else{
                res.send()
            }
        }else{
            res.send({
                illegalAccessRedirect : '/login'
            })
        }
    }
}