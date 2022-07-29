module.exports = {
    async logout(req,res){
        console.log(req.session.username+" logout")
        req.session.destroy(err => {
            if(err){
                //
            }
            res.clearCookie('bnmo')
            res.redirect('/api/login')
        })
    }
}