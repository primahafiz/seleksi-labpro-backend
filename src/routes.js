const RegisterController = require('./controller/RegisterController')
const LoginController = require('./controller/LoginController')
const RequestTransactionController = require('./controller/RequestTransactionController')
const TransferTransactionController = require('./controller/TransferTransactionController')
const HistoryRequestController = require('./controller/HistoryRequestController')
const HistoryTransferController = require('./controller/HistoryTransferTransaction')

module.exports = (app) => {
    app.get('/',(req,res)=>{
        console.log('hello world')
    })

    app.post('/register',RegisterController.registerCustomer)

    app.post('/login',LoginController.login)

    app.post('/request',RequestTransactionController.reqTransaction)

    app.post('/transfer',TransferTransactionController.transTransaction)

    app.get('/history/request',HistoryRequestController.getRequestHistory)

    app.get('/history/transfer',HistoryTransferController.getTransferHistory)
}