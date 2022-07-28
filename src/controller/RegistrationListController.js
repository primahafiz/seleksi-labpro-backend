const {Customer} = require('../models')
const FormatDate = require('../utils/FormatDate')

module.exports = {
    async getAllCustomer(req,res){
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        var customer = await Customer.findAll({
            where : {
                IsProceed : false
            }
        })
        for(let i=0;i<customer.length;i++){
            customer[i].dataValues.formattedDate = FormatDate.formatDate(customer[i].createdAt)
        }
        res.send({
            data : customer
        })
    }
}