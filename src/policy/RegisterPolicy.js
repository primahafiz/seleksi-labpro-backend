module.exports = {
    async checkRegisterData(req,res,next){
        var regex = /\s+/;
        if(req.body.username == '' || req.body.password == '' || req.body.name == '' || req.file==null ){
            res.send({
                error : 'Field cannot be empty'
            })
        }
        else if(regex.test(req.body.username) || regex.test(req.body.password)){
            res.send({
                error : 'Username or Password cannot contain spaces'
            })
        }else if(req.body.password.length<8){
            res.send({
                error : 'Password is less than 8 characters'
            })
        }else{
            next()
        }
    }
}