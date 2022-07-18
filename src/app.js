const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const {sequelize} = require('./models')
const config = require('./config/config')
const session = require('express-session')
const { uuid } = require('uuidv4');

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

const SESS_NAME = 'bnmo'
const SESS_SECRET = uuid()
const SESS_LIFETIME = 3600000

app.use(session({
    name : SESS_NAME,
    resave : false,
    saveUninitialized : false,
    secret : SESS_SECRET,
    cookie : {
        maxAge : SESS_LIFETIME,
        sameSite : true,
        secure : false // pas production jadi true
    }
}))

require('./routes')(app)

process.env.TZ = "Asia/Jakarta";

sequelize.sync({force:false})
    .then(() => {
        app.listen(config.port)
    })