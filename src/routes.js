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
const AdminPolicy = require('./policy/AdminPolicy')
const CustomerPolicy = require('./policy/CustomerPolicy')

module.exports = (app) => {

    const multer = Multer({
        storage: Multer.memoryStorage(),
        limits: {
          fileSize: 10 * 1024 * 1024
        }
      });
    
    app.post('/api/register',multer.single('photo'),RegisterPolicy.checkRegisterData, RegisterController.registerCustomer)
    
    app.post('/api/login',LoginController.login)

    app.post('/api/logout',LogoutController.logout)
    
    app.get('/api/currency',CustomerPolicy.isCustomer, CurrencyListController.getListCurrency)

    app.post('/api/request',CustomerPolicy.isCustomer,RequestTransactionController.reqTransaction)

    app.post('/api/transfer',CustomerPolicy.isCustomer,TransferPolicy.checkReceiver,TransferTransactionController.transTransaction)

    app.get('/api/history',CustomerPolicy.isCustomer,HistoryTransactionController.getTransactionHistory)

    app.get('/api/admin/verify-registration',AdminPolicy.isAdmin,RegistrationListController.getAllCustomer)

    app.put('/api/admin/verify-registration/accept/:username',AdminPolicy.isAdmin,VerifyRegistrationController.acceptRegistration)

    app.put('/api/admin/verify-registration/decline/:username',AdminPolicy.isAdmin,VerifyRegistrationController.declineRegistration)

    app.get('/api/admin/verify-request',AdminPolicy.isAdmin,RequestListController.getAllRequest)

    app.put('/api/admin/verify-request/accept/:idrequest',AdminPolicy.isAdmin,VerifyRequestController.acceptRequest)

    app.put('/api/admin/verify-request/decline/:idrequest',AdminPolicy.isAdmin,VerifyRequestController.declineRequest)

    app.get('/api/profile',CustomerPolicy.isCustomer,ProfileController.getProfile)

    app.get('/api/profile/:username',AdminPolicy.isAdmin,ProfileAdminController.getProfile)

    app.get('/api/search',AdminPolicy.isAdmin,SearchController.getCustomerByInput)

    app.get('/api/isAdmin',IsAdmin.isAdmin)

    app.get('/api/isCustomer',IsCustomer.isCustomer)

    app.get('/api/login',(req,res) => {res.send({})})
    app.get('/api/register',(req,res) => {res.send({})})
    app.get('/api',(req,res) => {res.send({})})
    app.get('/api/request',(req,res) => {res.send({})})
    app.get('/api/transfer',(req,res) => {res.send({})})
    app.get('/api/admin',(req,res) => {res.send({})})
    app.get('/api/admin/verify-registration',(req,res) => {res.send({})})
    app.get('/api/admin/verify-request',(req,res) => {res.send({})})
    app.get('/api/admin/search',(req,res) => {res.send({})})
    app.get('/api/admin/profile/:user',(req,res) => {res.send({})})
}