const {Customer} = require('../models')
const {Op} = require('sequelize')

module.exports = {
    async getCustomerByInput(req,res){
        if(req.query.searchInput){
            const customer = await Customer.findAll({
                where : {
                    Username : {[Op.like]: `%${req.query.searchInput}%`}
                }
            })
            res.send({
                data : customer
            })
        }else{
            res.send({
                data : []
            })
        }
    }
}