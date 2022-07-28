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
const RequestListController = require('./controller/RequestListController')
const RegistrationListController = require('./controller/RegistrationListController')
const AdminHomeController = require('./controller/AdminHomeController')
const LogoutController = require('./controller/LogoutController')
const TransferPolicy = require('./policy/TransferPolicy')

module.exports = (app) => {

    app.get('/api',HomeController.getHomeInfo)

    const multer = Multer({
        storage: Multer.memoryStorage(),
        limits: {
          fileSize: 10 * 1024 * 1024
        }
      });
    
    app.post('/api/register',multer.single('photo'), RegisterController.registerCustomer)

    app.get('/api/login',(req,res) => {res.send()})
    
    app.post('/api/login',LoginController.login)

    app.post('/api/logout',LogoutController.logout)
    
    app.get('/api/request', CurrencyListController.getListCurrency)

    app.post('/api/request',RequestTransactionController.reqTransaction)

    app.get('/api/transfer', CurrencyListController.getListCurrency)

    app.post('/api/transfer',TransferPolicy.checkReceiver,TransferTransactionController.transTransaction)

    app.get('/api/history/request',HistoryRequestController.getRequestHistory)

    app.get('/api/history/transfer',HistoryTransferController.getTransferHistory)

    app.get('/api/admin',AdminHomeController.adminHome)

    app.get('/api/admin/verify-registration',RegistrationListController.getAllCustomer)

    app.put('/api/admin/verify-registration/accept/:username',VerifyRegistrationController.acceptRegistration)

    app.put('/api/admin/verify-registration/decline/:username',VerifyRegistrationController.declineRegistration)

    app.get('/api/admin/verify-request',RequestListController.getAllRequest)

    app.put('/api/admin/verify-request/accept/:idrequest',VerifyRequestController.acceptRequest)

    app.put('/api/admin/verify-request/decline/:idrequest',VerifyRequestController.declineRequest)
}