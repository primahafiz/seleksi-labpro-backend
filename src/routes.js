const Multer = require('multer')
const RegisterController = require('./controller/RegisterController')
const LoginController = require('./controller/LoginController')
const RequestTransactionController = require('./controller/RequestTransactionController')
const TransferTransactionController = require('./controller/TransferTransactionController')
const VerifyRegistrationController = require('./controller/VerifyRegistrationController')
const VerifyRequestController = require('./controller/VerifyRequestController')
const CurrencyListController = require('./controller/CurrencyListController')
const RequestListController = require('./controller/RequestListController')
const RegistrationListController = require('./controller/RegistrationListController')
const LogoutController = require('./controller/LogoutController')
const HistoryTransactionController = require('./controller/HistoryTransactionController')
const ProfileController = require('./controller/ProfileController')
const ProfileAdminController = require('./controller/ProfileAdminController')
const SearchController = require('./controller/SearchController')
const IsAdmin = require('./controller/IsAdmin')
const IsCustomer = require('./controller/IsCustomer')
const TransferPolicy = require('./policy/TransferPolicy')
const RegisterPolicy = require('./policy/RegisterPolicy')

module.exports = (app) => {

    const multer = Multer({
        storage: Multer.memoryStorage(),
        limits: {
          fileSize: 10 * 1024 * 1024
        }
      });
    
    app.post('/api/register',multer.single('photo'),RegisterPolicy.checkRegisterData, RegisterController.registerCustomer)

    app.get('/api/login',(req,res) => {res.send()})
    
    app.post('/api/login',LoginController.login)

    app.post('/api/logout',LogoutController.logout)
    
    app.get('/api/currency', CurrencyListController.getListCurrency)

    app.post('/api/request',RequestTransactionController.reqTransaction)

    app.post('/api/transfer',TransferPolicy.checkReceiver,TransferTransactionController.transTransaction)

    app.get('/api/history',HistoryTransactionController.getTransactionHistory)

    app.get('/api/admin/verify-registration',RegistrationListController.getAllCustomer)

    app.put('/api/admin/verify-registration/accept/:username',VerifyRegistrationController.acceptRegistration)

    app.put('/api/admin/verify-registration/decline/:username',VerifyRegistrationController.declineRegistration)

    app.get('/api/admin/verify-request',RequestListController.getAllRequest)

    app.put('/api/admin/verify-request/accept/:idrequest',VerifyRequestController.acceptRequest)

    app.put('/api/admin/verify-request/decline/:idrequest',VerifyRequestController.declineRequest)

    app.get('/api/profile',ProfileController.getProfile)

    app.get('/api/profile/:username',ProfileAdminController.getProfile)

    app.get('/api/search',SearchController.getCustomerByInput)

    app.get('/api/isAdmin',IsAdmin.isAdmin)

    app.get('/api/isCustomer',IsCustomer.isCustomer)
}