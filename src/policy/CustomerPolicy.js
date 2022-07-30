const TokenJWT = require('../utils/TokenJWT')

module.exports = {
    isCustomer(req,res,next){
        if(req.session.username && req.session.token){
            if(TokenJWT.isTokenAdmin(req.session.token)){
                res.send({
                    error : 'Illegal API Acess'
                })
            }else{
                next()
            }
        }else{
            res.send({
                error : 'Illegal API Acess'
            })
        }
    }
}