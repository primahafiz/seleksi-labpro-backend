const Multer = require('multer')
const RegisterController = require('./controller/RegisterController')
const LoginController = require('./controller/LoginController')
const RequestTransactionController = require('./controller/RequestTransactionController')
const TransferTransactionController = require('./controller/TransferTransactionController')
const HistoryRequestController = require('./controller/HistoryRequestController')
const HistoryTransferController = require('./controller/HistoryTransferTransaction')
const VerifyRegistrationController = require('./controller/VerifyRegistrationController')
const VerifyRequestController = require('./controller/VerifyRequestController')
const CurrencyListController = require('./controller/CurrencyListController')
const HomeController = require('./controller/HomeController')

module.exports = (app) => {

    app.get('/',HomeController.getHomeInfo)

    const multer = Multer({
        storage: Multer.memoryStorage(),
        limits: {
          fileSize: 10 * 1024 * 1024
        }
      });
    
    app.post('/register',multer.single('photo'), RegisterController.registerCustomer)
    
    app.post('/login',LoginController.login)
    
    app.get('/request', CurrencyListController.getListCurrency)

    app.post('/request',RequestTransactionController.reqTransaction)

    app.post('/transfer',TransferTransactionController.transTransaction)

    app.get('/history/request',HistoryRequestController.getRequestHistory)

    app.get('/history/transfer',HistoryTransferController.getTransferHistory)

    app.put('/admin/verify-registration/accept/:username',VerifyRegistrationController.acceptRegistration)

    app.put('/admin/verify-registration/decline/:username',VerifyRegistrationController.declineRegistration)

    app.put('/admin/verify-request/accept/:idrequest',VerifyRequestController.acceptRequest)

    app.put('/admin/verify-request/accept/:idrequest',VerifyRequestController.declineRequest)
}