const TokenJWT = require('../utils/TokenJWT')

module.exports = {
    isAdmin(req,res){
        if(req.session.username && req.session.token){
            if(TokenJWT.isTokenCustomer(req.session.token)){
                res.send({
                    illegalAccessRedirect : '/'
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