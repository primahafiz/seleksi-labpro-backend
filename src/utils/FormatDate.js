const moment = require('moment')

module.exports = {
    formatDate(date){
        return moment(date).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm')
    }
}