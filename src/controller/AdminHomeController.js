const {Admin} = require('../models')

module.exports = {
    async adminHome(req,res){
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        res.send({
            name : req.session.name
        })
    }
}